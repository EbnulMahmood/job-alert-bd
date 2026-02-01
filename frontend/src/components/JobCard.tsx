import { ExternalLink, MapPin, Clock, Briefcase } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Job } from '../services/api'

interface JobCardProps {
  job: Job
}

function JobCard({ job }: JobCardProps) {
  const experienceBadgeColor = {
    'Senior': 'badge-blue',
    'Mid-Level': 'badge-green',
    'Junior': 'badge-yellow',
    'Intern': 'badge-gray',
  }[job.experience_level || ''] || 'badge-gray'

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-primary-600">{job.company}</span>
            {job.experience_level && (
              <span className={`badge ${experienceBadgeColor}`}>
                {job.experience_level}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {job.job_type}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
            </span>
          </div>

          {job.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {job.description}
            </p>
          )}

          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {job.tags.slice(0, 4).map((tag, i) => (
                <span key={i} className="badge badge-gray text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center gap-1 whitespace-nowrap"
        >
          Apply
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {job.deadline && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-red-600 font-medium">
            Deadline: {new Date(job.deadline).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  )
}

export default JobCard
