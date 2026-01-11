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
