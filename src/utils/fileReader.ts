// Binary file extensions to skip
const BINARY_EXTENSIONS = new Set([
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'ico',
  'svg',
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'zip',
  'tar',
  'gz',
  'rar',
  '7z',
  'exe',
  'dll',
  'so',
  'dylib',
  'mp3',
  'mp4',
  'wav',
  'avi',
  'mov',
  'woff',
  'woff2',
  'ttf',
  'eot',
  'otf',
  'bin',
  'dat',
])

export function isBinaryExtension(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return BINARY_EXTENSIONS.has(ext)
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`))
    reader.readAsText(file, 'UTF-8')
  })
}

export function containsBinaryContent(content: string): boolean {
  // Check for null bytes which indicate binary content
  return content.includes('\0')
}

export interface ReadFileResult {
  success: boolean
  content: string
  error?: string
  isBinary?: boolean
}

export async function readTextFile(file: File): Promise<ReadFileResult> {
  // Skip files with binary extensions
  if (isBinaryExtension(file.name)) {
    return { success: false, content: '', isBinary: true, error: 'Binary file skipped' }
  }

  try {
    const content = await readFileAsText(file)

    // Check if content appears to be binary
    if (containsBinaryContent(content)) {
      return { success: false, content: '', isBinary: true, error: 'Binary content detected' }
    }

    return { success: true, content }
  } catch (error) {
    return {
      success: false,
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// FileSystem Entry type for folder drag & drop
export interface FileSystemEntryLike {
  isFile: boolean
  isDirectory: boolean
  name: string
  fullPath?: string
  file?: (success: (file: File) => void, error?: (err: Error) => void) => void
  createReader?: () => {
    readEntries: (
      success: (entries: FileSystemEntryLike[]) => void,
      error?: (err: Error) => void
    ) => void
  }
}

export interface FileWithPath {
  file: File
  path: string
}

async function readAllEntries(
  reader: ReturnType<NonNullable<FileSystemEntryLike['createReader']>>
): Promise<FileSystemEntryLike[]> {
  const allEntries: FileSystemEntryLike[] = []

  // readEntries may not return all entries in one call, so we keep reading
  const readBatch = (): Promise<FileSystemEntryLike[]> =>
    new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject)
    })

  let entries = await readBatch()
  while (entries.length > 0) {
    allEntries.push(...entries)
    entries = await readBatch()
  }

  return allEntries
}

export async function readDirectory(
  entry: FileSystemEntryLike,
  basePath = ''
): Promise<FileWithPath[]> {
  const files: FileWithPath[] = []
  const currentPath = basePath ? `${basePath}/${entry.name}` : entry.name

  if (entry.isFile && entry.file) {
    const file = await new Promise<File>((resolve, reject) => {
      entry.file!(resolve, reject)
    })
    files.push({ file, path: currentPath })
    return files
  }

  if (entry.isDirectory && entry.createReader) {
    const reader = entry.createReader()
    const entries = await readAllEntries(reader)

    for (const childEntry of entries) {
      const childFiles = await readDirectory(childEntry, currentPath)
      files.push(...childFiles)
    }
  }

  return files
}

export function getEntriesFromDataTransfer(dataTransfer: DataTransfer): FileSystemEntryLike[] {
  const entries: FileSystemEntryLike[] = []
  const items = dataTransfer.items

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    // webkitGetAsEntry is the standard way to access directory structure
    const entry = (item as DataTransferItem & { webkitGetAsEntry?: () => FileSystemEntryLike })
      .webkitGetAsEntry?.() as FileSystemEntryLike | null
    if (entry) {
      entries.push(entry)
    }
  }

  return entries
}
