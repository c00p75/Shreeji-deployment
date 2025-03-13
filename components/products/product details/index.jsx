import Image from 'next/image'
import './style.scss'
import { ArrowRightCircle } from 'lucide-react'

const ProductDetails = ({product}) => {
  return (
    <div className="pl-10 pr-5 text-black h-full pt-5">
      {product['brand logo'] && (
        <div className='w-full h-fit flex-center mb-5'>
          <Image src={product['brand logo']} quality={100} alt={product['name']} className='w-auto h-16 z-[1] object-cover' />
        </div>
      )}
      {product['name'] && <h1 className="text-6xl font-bold text-center">{product['name']}</h1>}
      {product['description'] && <p className="text-2xl text-[#544829] mt-5 text-center">{product['description']}</p>}
      
      <div className='flex justify-center items-center flex-row mt-10'>
        <div className='flex-1 relative'>
          <Image src={product.image} alt={product['name']} className='w-full h-auto z-[1] relative' />
          {product['special feature'] && (
            <div className="special-feature text-2xl mt-5 font-bold flex items-center z-0">
              {product['special feature']['stat'] && (
                <div className='text-9xl special-feature-stat'>
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
        </div>

        <div className='product-specs flex-1 p-10'>      
          {product['specs'] && (
            <ul className='-mt-10 text-xl flex flex-col gap-2'>
            {Object.entries(product['specs']).map(([key, value]) => (
              <li key={key}>
                <strong className='text-[#544829]'>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          )}

          {product['tagline'] && <h1 className="text-2xl text-[#544829] mt-5 font-bold">{product['tagline']}</h1>}          
        </div>
      </div>

      <div className='bg-[var(--shreeji-primary)] px-10 py-3 mt-28 text-white text-2xl font-semibold flex justify-between items-center rounded-full border-t-[#e8d9c2] border-4'>
        <p className='flex-1 text-base'>
          Shreeji House, Plot No. 1209,
          <br />
          Addis Ababa Drive
        </p>
        
        <div className='flex-1 flex justify-center items-center gap-2 text-center uppercase'>
          <span>Request Quote</span>
          <ArrowRightCircle size={30} strokeWidth={2.5} />
        </div>

        <p className='flex-1 text-right'>
          +260 77 116 1111
        </p>
      </div>
    </div>
  )
}

export default ProductDetails