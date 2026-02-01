import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { Search, Filter, Briefcase, Loader2 } from 'lucide-react'
import { jobsApi } from '../services/api'
import JobCard from '../components/JobCard'
import CompanyFilter from '../components/CompanyFilter'

function Jobs() {
  const [search, setSearch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: jobsApi.getCompanies,
  })

  const { data: jobsData, isLoading, isFetching } = useQuery({
    queryKey: ['jobs', page, selectedCompany, selectedLevel, search],
    queryFn: () => jobsApi.getJobs({
      page,
      per_page: 20,
      company: selectedCompany || undefined,
      experience_level: selectedLevel || undefined,
      search: search || undefined,
    }),
    placeholderData: keepPreviousData,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
  }

  const experienceLevels = ['Senior', 'Mid-Level', 'Junior', 'Intern']

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Openings</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, description, or keywords..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </form>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by Company</span>
          </div>
          {companies && (
            <CompanyFilter
              companies={companies}
              selectedCompany={selectedCompany}
              onSelect={(company) => {
                setSelectedCompany(company)
                setPage(1)
              }}
            />
          )}
        </div>

        <div>
          <span className="text-sm font-medium text-gray-700 mb-2 block">Experience Level</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedLevel(null)
                setPage(1)
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedLevel === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Levels
            </button>
            {experienceLevels.map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level)
                  setPage(1)
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {jobsData ? (
            <>
              Showing {((page - 1) * 20) + 1}-{Math.min(page * 20, jobsData.total)} of {jobsData.total} jobs
            </>
          ) : (
            'Loading...'
          )}
        </p>
        {isFetching && !isLoading && (
          <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
        )}
      </div>

      {/* Job List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : jobsData?.jobs && jobsData.jobs.length > 0 ? (
        <div className="space-y-4">
          {jobsData.jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-10">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No jobs found matching your criteria.</p>
          <button
            onClick={() => {
              setSearch('')
              setSelectedCompany(null)
              setSelectedLevel(null)
              setPage(1)
            }}
            className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {jobsData && jobsData.total_pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {page} of {jobsData.total_pages}
          </span>
          <button
            onClick={() => setPage(Math.min(jobsData.total_pages, page + 1))}
            disabled={page === jobsData.total_pages}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Jobs
