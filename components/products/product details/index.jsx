import Image from 'next/image'
import React from 'react'

const ProductDetails = ({product}) => {
  return (
    <div className="p-10">
      {product['name'] && <h1 className="text-3xl font-bold">{product['name']}</h1>}
      {product['category'] && <p className="text-lg">Category: {product['category']}</p>}
      {product['subcategory'] && <p className="text-lg">Category: {product['subcategory']}</p>}
      
      <p className="text-lg font-semibold">Price: {product.price}</p>
      <Image src={product.image} alt={product['name']} width={400} height={400} />
    </div>
  )
}

export default ProductDetails