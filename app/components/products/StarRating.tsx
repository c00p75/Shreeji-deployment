'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  readonly?: boolean
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  readonly = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const handleClick = (value: number) => {
    if (interactive && !readonly && onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => {
        const isFilled = value <= Math.round(rating)
        const Icon = isFilled ? StarIcon : StarIconOutline

        return (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            disabled={!interactive || readonly}
            className={`${sizeClasses[size]} ${
              interactive && !readonly
                ? 'cursor-pointer hover:scale-110 transition-transform'
                : 'cursor-default'
            } ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <Icon className={sizeClasses[size]} />
          </button>
        )
      })}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

