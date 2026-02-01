import { Building2 } from 'lucide-react'
import type { Company } from '../services/api'

interface CompanyFilterProps {
  companies: Company[]
  selectedCompany: string | null
  onSelect: (company: string | null) => void
}

function CompanyFilter({ companies, selectedCompany, onSelect }: CompanyFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selectedCompany === null
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {companies.map((company) => (
        <button
          key={company.company}
          onClick={() => onSelect(company.company)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedCompany === company.company
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Building2 className="w-3 h-3" />
          {company.company}
          <span className="ml-1 text-xs opacity-70">({company.count})</span>
        </button>
      ))}
    </div>
  )
}

export default CompanyFilter
