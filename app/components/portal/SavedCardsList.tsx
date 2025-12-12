'use client'

import { CreditCardIcon, TrashIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import type { SavedCard } from '@/app/portal/payment-methods/page'

interface SavedCardsListProps {
  cards: SavedCard[]
  onSetDefault: (cardId: number) => void
  onDelete: (card: SavedCard) => void
}

export default function SavedCardsList({ cards, onSetDefault, onDelete }: SavedCardsListProps) {
  const getCardTypeIcon = (cardType: string) => {
    const type = cardType?.toLowerCase() || ''
    if (type.includes('visa')) return '💳'
    if (type.includes('mastercard') || type.includes('master')) return '💳'
    if (type.includes('amex') || type.includes('american')) return '💳'
    return '💳'
  }

  const formatExpiry = (month: string, year: string) => {
    if (!month || !year) return 'N/A'
    const monthNum = parseInt(month)
    const yearNum = parseInt(year)
    if (isNaN(monthNum) || isNaN(yearNum)) return 'N/A'
    return `${monthNum.toString().padStart(2, '0')}/${yearNum.toString().slice(-2)}`
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No saved cards</h3>
        <p className="mt-2 text-sm text-gray-500">
          You haven't saved any payment methods yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:border-[var(--shreeji-primary)] transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{getCardTypeIcon(card.cardType)}</div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {card.cardType?.toUpperCase() || 'CARD'} •••• {card.last4}
                </h3>
                {card.isDefault && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[var(--shreeji-primary)] text-white">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {card.cardholderName || 'Cardholder'} • Expires {formatExpiry(card.expiryMonth, card.expiryYear)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {!card.isDefault && (
              <button
                onClick={() => onSetDefault(card.id)}
                className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                title="Set as default"
              >
                <StarIcon className="h-5 w-5" />
              </button>
            )}
            {card.isDefault && (
              <div className="p-2 text-yellow-500" title="Default card">
                <StarIconSolid className="h-5 w-5" />
              </div>
            )}
            <button
              onClick={() => onDelete(card)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete card"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

