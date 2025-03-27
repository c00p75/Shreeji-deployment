import React from 'react'
import './style.scss'

const SpecialFeaturBudge = ({product}) => {
  if(!product['special feature']){return}

  return  (
      <div className="special-feature text-2xl mt-5 font-bold flex items-center z-0">
        {product['special feature']['stat'] && (
          <div className={
            `text-${product['special feature']['stat text size'] ? product['special feature']['stat text size'] : 9} special-feature-stat`
          }>
            {product['special feature']['stat']}
            <span className='speacial-feature-shadow' />
          </div>
        )}

        <div className='flex flex-col mb-5'>
          {product['special feature']['symbol'] && (
            <span className='text-4xl font-semibold'>{product['special feature']['symbol']}</span>
          )}

          {product['special feature']['feature'] && (
            <span className='w-14 font-light'>
              {product['special feature']['feature']}                    
            </span>
          )}
        </div>
      </div>
    )}  

export default SpecialFeaturBudge