import Image from 'next/image'
import './style.scss'
import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link';
import ProductImage from './product image';
import SpecialFeaturBudge from './special feature budge';

const ProductDetails = ({product}) => {  
  console.log('Fetching product', product)
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-3xl font-semibold text-gray-800">Product Currently Unavailable</p>
        <p className="text-lg text-gray-600 mt-2">
          Sorry, this product is out of stock or no longer available.
        </p>
        
        <Link
          href="/products"
          className="mt-5 px-6 py-3 bg-[var(--shreeji-primary)] text-white font-medium rounded-lg hover:scale-105 transition"
        >
          View More Products
        </Link>
      </div>
    );
  } 
  
  return (
    <div className="pl-10 pr-5 text-black h-full pt-5 product-details">
      {product['brand logo'] && (
        <div className='w-full h-fit flex-center mb-5'>
          <Image src={product['brand logo']} quality={100} alt={product['name']} className='w-auto h-16 z-[1] object-cover' />
        </div>
      )}
      {product['name'] && <h1 className="text-6xl font-bold text-center pb-5 bg-gradient-to-r from-[#807045] to-[#544829] bg-clip-text text-transparent">{product['name']}</h1>}
      {product['description'] && <p className="text-2xl text-[#544829] text-center">{product['description']}</p>}
      
      <div className={`flex justify-center items-start flex-row ${ product['special feature'] ? 'mt-14' : ''}`}>
        <div className='flex-1 relative mt-10'>
          {product['images'] && (
            <ProductImage images={product['images']} name={product.name} product={product} />
          )}      
        </div>

        <div className='product-specs flex-1 p-10 pr-0 scroll-container'>    
          {product['tagline'] && <h1 className="text-3xl mb-10 font-bold bg-gradient-to-r from-[#807045] to-[#544829] bg-clip-text text-transparent">{product['tagline']}</h1>}            
          {product['specs'] && (
            <ul className='text-xl flex flex-col gap-2'>
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>
                  <strong className='text-[#544829] capitalize'>{key.replace(/-/g, ' ')}:</strong>{" "}
            
                  {typeof value === "object" && !Array.isArray(value) ? (
                    // Handle nested objects
                    Object.entries(value).map(([subKey, subValue]) => (
                      <div className='ml-10' key={subKey}>
                        <strong className='text-[#544829] capitalize'>{subKey.replace(/-/g, ' ')}:</strong> {subValue}
                      </div>
                    ))
                  ) : Array.isArray(value) ? (
                    // Handle arrays
                    <ul className='ml-10 list-disc'>
                      {value.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    // Handle regular values
                    value
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* {product['tagline'] && <h1 className="text-4xl text-[#544829] mt-5 font-bold">{product['tagline']}</h1>}           */}
        </div>
      </div>

      <div className='bg-[var(--shreeji-primary)] px-10 py-3 mt-16 text-white text-2xl font-semibold flex justify-between items-center rounded-full border-t-[#e8d9c2] border-4'>
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