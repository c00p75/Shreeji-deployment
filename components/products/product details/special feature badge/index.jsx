import React from 'react'
import './style.scss'

const SpecialFeaturBudge = ({product}) => {
  if(!product['special feature']){
    return  (
      <div className="special-feature special-badge text-2xl mt-5 font-bold flex items-center z-0">
        <div className="content no-spin">          
          <div className="front">
            <div className="description absolute left-[20%] top-[40%]">
              <h3 className="text-[8rem]">1</h3>
              <span className='speacial-feature-shadow' />
            </div>
            <div className='z-[10] flex flex-col mb-5 subtitle absolute right-[15%] top-[40%]'>                                
              <span className='w-14 font-light'>
                Year Warranty
              </span>                
            </div>
          </div>
        </div>
      </div>
      )
  }

  return  (
    <div className="special-feature special-badge text-2xl mt-5 font-bold flex items-center z-0">
      <div className="content">
        <div className="front">
          <div className='z-[10] flex flex-col mb-5 subtitle absolute h-full justify-center items-center right-[10%] top-0'>
            {product['special feature']['symbol'] && (
              <span className='text-4xl text-center font-semibold -mb-2'>{product['special feature']['symbol']}</span>
            )}

            {product['special feature']['feature'] && (
              <span className='w-14 font-light'>
                {product['special feature']['feature']}                    
              </span>
            )}
          </div>
          {product['special feature']['stat'] && (
            <div className={
              `text-${product['special feature']['stat text size'] ? product['special feature']['stat text size'] : 9} special-feature-stat title z-[1]`
            }>
              <h3 className="title">{product['special feature']['stat']}</h3>
              <span className='speacial-feature-shadow' />
            </div>
          )}  
        </div>

        <div className="back">
          <div className="description absolute left-[20%] top-[40%]">
            <h3 className="text-[8rem]">1</h3>
            <span className='speacial-feature-shadow' />
          </div>
          <div className='z-[10] flex flex-col mb-5 subtitle absolute right-[15%] top-[40%]'>                                
            <span className='w-14 font-light'>
              Year Warranty
            </span>                
          </div>
        </div>
      </div>
    </div>
    )}  

export default SpecialFeaturBudge