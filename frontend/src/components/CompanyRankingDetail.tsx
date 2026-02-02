import { ArrowLeft, ExternalLink, Users, Check, ThumbsUp, ThumbsDown, Briefcase } from 'lucide-react'
import StarRating from './StarRating'
import type { CompanyRanking } from '../data/companyRankings'
import { getCompanyTypeLabel } from '../data/companyRankings'

interface CompanyRankingDetailProps {
  company: CompanyRanking
  rank: number
  onBack: () => void
}

function CompanyRankingDetail({ company, rank, onBack }: CompanyRankingDetailProps) {
  const typeBadgeColor = {
    private: 'badge-blue',
    government: 'badge-green',
    mnc: 'badge-yellow',
  }[company.type]

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Rankings
      </button>

      {/* Header */}
      <div className="card mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold text-primary-600">#{rank}</span>
              <h1 className="text-xl font-bold text-gray-900">{company.name}</h1>
              <span className={`badge ${typeBadgeColor}`}>
                {getCompanyTypeLabel(company.type)}
              </span>
            </div>
            <StarRating score={company.overallScore} size="md" />
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{company.origin}</span>
              {company.foundedYear && <span>Est. {company.foundedYear}</span>}
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {company.employeeCount}
              </span>
            </div>
          </div>
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-1 whitespace-nowrap text-sm"
          >
            Careers
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Salary Range */}
      <div className="card mb-4">
        <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Estimated Salary Range (BDT/month)
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Junior', value: company.salaryRange.junior, color: 'bg-green-50 border-green-200' },
            { label: 'Mid-Level', value: company.salaryRange.mid, color: 'bg-blue-50 border-blue-200' },
            { label: 'Senior', value: company.salaryRange.senior, color: 'bg-purple-50 border-purple-200' },
          ].map((item) => (
            <div key={item.label} className={`rounded-lg border p-3 text-center ${item.color}`}>
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card mb-4">
        <h2 className="font-semibold text-gray-900 mb-3">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {company.techStack.map((tech) => (
            <span key={tech} className="badge badge-blue">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Work Culture */}
      <div className="card mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Work Culture</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{company.workCulture}</p>
      </div>

      {/* Interview Process */}
      <div className="card mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Interview Process</h2>
        <p className="text-sm text-gray-600">{company.interviewProcess}</p>
      </div>

      {/* Benefits */}
      <div className="card mb-4">
        <h2 className="font-semibold text-gray-900 mb-3">Benefits & Perks</h2>
        <div className="grid grid-cols-2 gap-2">
          {company.benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="card">
          <h2 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" />
            Pros
          </h2>
          <ul className="space-y-2">
            {company.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
            <ThumbsDown className="w-4 h-4" />
            Cons
          </h2>
          <ul className="space-y-2">
            {company.cons.map((con) => (
              <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-500 mt-0.5">-</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        * Salary ranges and scores are estimates based on publicly available information and may vary.
      </p>
    </div>
  )
}

export default CompanyRankingDetail
