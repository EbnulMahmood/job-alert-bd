import { useState, useMemo } from 'react'
import { Trophy } from 'lucide-react'
import CompanyRankingCard from '../components/CompanyRankingCard'
import CompanyRankingDetail from '../components/CompanyRankingDetail'
import { companyRankings, getCompaniesSortedByScore } from '../data/companyRankings'
import type { CompanyRanking, CompanyType } from '../data/companyRankings'

type FilterType = 'all' | CompanyType
type SortBy = 'score' | 'name' | 'salary'

function Rankings() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyRanking | null>(null)
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortBy>('score')

  const filteredAndSorted = useMemo(() => {
    let companies = [...companyRankings]

    if (filterType !== 'all') {
      companies = companies.filter(c => c.type === filterType)
    }

    switch (sortBy) {
      case 'score':
        companies.sort((a, b) => b.overallScore - a.overallScore)
        break
      case 'name':
        companies.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'salary':
        companies.sort((a, b) => {
          const extractMax = (s: string) => {
            const match = s.match(/(\d+)K/)
            return match ? parseInt(match[1]) : 0
          }
          return extractMax(b.salaryRange.senior) - extractMax(a.salaryRange.senior)
        })
        break
    }

    return companies
  }, [filterType, sortBy])

  const allSorted = getCompaniesSortedByScore()

  if (selectedCompany) {
    const globalRank = allSorted.findIndex(c => c.id === selectedCompany.id) + 1
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <CompanyRankingDetail
          company={selectedCompany}
          rank={globalRank}
          onBack={() => setSelectedCompany(null)}
        />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-1">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h1 className="text-2xl font-bold text-gray-900">Company Rankings</h1>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Top tech companies in Bangladesh rated & compared for career growth
      </p>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {[
          { value: 'all', label: 'All' },
          { value: 'private', label: 'Private' },
          { value: 'government', label: 'Government' },
          { value: 'mnc', label: 'MNC' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setFilterType(option.value as FilterType)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterType === option.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}

        <span className="text-gray-300 mx-1">|</span>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 text-gray-700 focus:ring-2 focus:ring-primary-500"
        >
          <option value="score">Sort by Score</option>
          <option value="name">Sort by Name</option>
          <option value="salary">Sort by Salary</option>
        </select>
      </div>

      {/* Company List */}
      <div className="space-y-3">
        {filteredAndSorted.map((company) => {
          const globalRank = allSorted.findIndex(c => c.id === company.id) + 1
          return (
            <CompanyRankingCard
              key={company.id}
              company={company}
              rank={globalRank}
              onClick={() => setSelectedCompany(company)}
            />
          )
        })}
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No companies found for this filter.
        </div>
      )}

      <p className="mt-6 text-xs text-gray-400 text-center">
        * Rankings are estimates based on publicly available data and developer community feedback.
      </p>
    </div>
  )
}

export default Rankings
