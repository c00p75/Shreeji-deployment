'use client'

interface CheckoutOrderNotesProps {
  notes: string
  onChange: (notes: string) => void
}

export default function CheckoutOrderNotes({ notes, onChange }: CheckoutOrderNotesProps) {
  return (
    <div>
      <label className='text-sm font-medium text-gray-700'>Order notes (optional)</label>
      <textarea
        className='mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--shreeji-primary)] focus:outline-none'
        rows={3}
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Let us know about delivery instructions or other details.'
      />
    </div>
  )
}

