import type { GitHubRepo, ContextFile } from '@/types'
import { ContextSource } from '@/types'
import { isBinaryExtension } from '@/utils/fileReader'

interface GitHubTreeItem {
  path: string
  type: 'blob' | 'tree'
  size?: number
}

interface GitHubTreeResponse {
  tree: GitHubTreeItem[]
  truncated: boolean
}

interface GitHubContentResponse {
  content: string
  encoding: string
}

const MAX_FILE_SIZE = 100 * 1024 // 100KB per file
const MAX_TOTAL_SIZE = 500 * 1024 // 500KB total
const MAX_FILES = 50 // Maximum number of files to fetch

// Language detection by file extension
function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const langMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'typescript',
    js: 'javascript',
    jsx: 'javascript',
    vue: 'vue',
    py: 'python',
    java: 'java',
    go: 'go',
    rs: 'rust',
    rb: 'ruby',
    php: 'php',
    css: 'css',
    scss: 'scss',
    html: 'html',
    json: 'json',
    md: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
    c: 'c',
    cpp: 'cpp',
    h: 'c',
    hpp: 'cpp',
    cs: 'csharp',
    swift: 'swift',
    kt: 'kotlin',
    scala: 'scala',
    sql: 'sql',
    sh: 'shell',
    bash: 'shell',
    xml: 'xml',
    toml: 'toml',
  }
  return langMap[ext] || 'plaintext'
}

export async function fetchGitHubRepo(
  repo: GitHubRepo
): Promise<Omit<ContextFile, 'id' | 'addedAt'>[]> {
  // Fetch tree
  const treeUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}/git/trees/${repo.branch}?recursive=1`
  const treeResponse = await fetch(treeUrl)

  if (!treeResponse.ok) {
    if (treeResponse.status === 404) {
      throw new Error('Repository not found or private')
    }
    if (treeResponse.status === 403) {
      throw new Error('API rate limit exceeded. Try again later.')
    }
    throw new Error(`Failed to fetch repository: ${treeResponse.status}`)
  }

  const treeData: GitHubTreeResponse = await treeResponse.json()

  // Filter to files within path (if specified), skip binary, and within size limit
  let textFiles = treeData.tree.filter((item) => {
    if (item.type !== 'blob') return false
    if (isBinaryExtension(item.path)) return false
    if ((item.size ?? 0) > MAX_FILE_SIZE) return false
    if (repo.path && !item.path.startsWith(repo.path)) return false
    return true
  })

  // Limit number of files
  textFiles = textFiles.slice(0, MAX_FILES)

  // Fetch file contents (limited by total size)
  const files: Omit<ContextFile, 'id' | 'addedAt'>[] = []
  let totalSize = 0

  for (const item of textFiles) {
    if (totalSize >= MAX_TOTAL_SIZE) break

    try {
      const contentUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${item.path}?ref=${repo.branch}`
      const contentResponse = await fetch(contentUrl)

      if (!contentResponse.ok) continue

      const contentData: GitHubContentResponse = await contentResponse.json()

      // Decode base64 content
      const content = atob(contentData.content.replace(/\n/g, ''))

      files.push({
        name: item.path.split('/').pop() || item.path,
        path: item.path,
        content,
        language: detectLanguage(item.path),
        size: content.length,
        source: ContextSource.GITHUB,
      })

      totalSize += content.length
    } catch {
      // Skip files that fail to fetch
      continue
    }
  }

  if (files.length === 0) {
    throw new Error('No readable files found in repository')
  }

  return files
}
