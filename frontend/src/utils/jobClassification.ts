import type { Job } from '../services/api'

const DOTNET_TAG_KEYWORDS = ['.net', 'c#', 'asp.net', 'backend']

const DOTNET_TEXT_KEYWORDS = [
  '.net', 'c#', 'asp.net core', 'asp.net', 'entity framework',
  'dotnet', 'csharp', 'sql server', 'mssql', 'azure',
]

const GOVERNMENT_INDICATORS = ['government', 'govt', 'semi-government']

export function isDotNetRecommended(job: Job): boolean {
  if (job.tags?.length) {
    const lowerTags = job.tags.map(t => t.toLowerCase())
    if (DOTNET_TAG_KEYWORDS.some(kw => lowerTags.some(tag => tag.includes(kw)))) {
      return true
    }
  }

  const searchText = `${job.title} ${job.description || ''} ${job.requirements || ''}`.toLowerCase()
  return DOTNET_TEXT_KEYWORDS.some(kw => searchText.includes(kw))
}

export function isPrivateCompany(job: Job): boolean {
  const jobTypeLower = (job.job_type || '').toLowerCase()
  if (GOVERNMENT_INDICATORS.some(g => jobTypeLower.includes(g))) {
    return false
  }

  if (job.tags?.some(tag => tag.toLowerCase() === 'government')) {
    return false
  }

  return true
}
