import { CircleDot } from 'lucide-react'
import React from 'react'

const Categories = ({categories}) => {
  return (
    <div className="bg-[var(--shreeji-primary)] flex flex-col px-5 py-1 h-fit">
      {categories.map((key, index) => (
        <div key={index} className="mr-2 px-5 flex gap-5 items-center border-b py-4 last:border-none cursor-pointer">
          <CircleDot color="#ffffff" strokeWidth={3} size={20} />
          <span>{key}</span>
        </div>
      ))}
    </div>
  )
}

export default Categories