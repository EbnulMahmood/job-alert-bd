import { Star } from 'lucide-react'

interface StarRatingProps {
  score: number
  size?: 'sm' | 'md'
  showNumber?: boolean
}

function StarRating({ score, size = 'sm', showNumber = true }: StarRatingProps) {
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(score)) {
      stars.push(
        <Star key={i} className={`${iconSize} text-yellow-400 fill-yellow-400`} />
      )
    } else if (i - score < 1 && i - score > 0) {
      stars.push(
        <div key={i} className="relative">
          <Star className={`${iconSize} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${(score % 1) * 100}%` }}>
            <Star className={`${iconSize} text-yellow-400 fill-yellow-400`} />
          </div>
        </div>
      )
    } else {
      stars.push(
        <Star key={i} className={`${iconSize} text-gray-300`} />
      )
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showNumber && (
        <span className={`font-semibold text-gray-700 ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
          {score.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default StarRating
