import { Users, ChevronRight } from 'lucide-react'
import StarRating from './StarRating'
import type { CompanyRanking } from '../data/companyRankings'
import { getCompanyTypeLabel } from '../data/companyRankings'

interface CompanyRankingCardProps {
  company: CompanyRanking
  rank: number
  onClick: () => void
}

function CompanyRankingCard({ company, rank, onClick }: CompanyRankingCardProps) {
  const typeBadgeColor = {
    private: 'badge-blue',
    government: 'badge-green',
    mnc: 'badge-yellow',
  }[company.type]

  return (
    <button
      onClick={onClick}
      className="card hover:shadow-md transition-shadow w-full text-left"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold text-primary-700">#{rank}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-gray-900">{company.name}</h3>
            <span className={`badge ${typeBadgeColor}`}>
              {getCompanyTypeLabel(company.type)}
            </span>
            <span className="text-xs text-gray-500">{company.origin}</span>
          </div>

          <StarRating score={company.overallScore} size="sm" />

          <div className="flex flex-wrap gap-1 mt-2">
            {company.techStack.slice(0, 5).map((tech) => (
              <span key={tech} className="badge badge-gray text-xs">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {company.employeeCount}
            </span>
            <span>
              Salary: <strong className="text-gray-700">{company.salaryRange.mid}</strong> (Mid)
            </span>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
      </div>
    </button>
  )
}

export default CompanyRankingCard
