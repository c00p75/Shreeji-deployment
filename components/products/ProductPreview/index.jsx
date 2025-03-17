import Link from "next/link";
import "./style.scss";
import Image from "next/image";

const ProductPreview = ({product, index, additionalClass}) => {
  return (    
    <Link 
      key={index}
      href={
        product["subcategory"]
          ? `/products/${encodeURIComponent(product.category)}/${encodeURIComponent(product["subcategory"])}/${encodeURIComponent(product.name)}`
          : `/products/${encodeURIComponent(product.category)}/${encodeURIComponent(product.name)}`
      }
      className={`products-page-product mr-2 px-5 flex flex-col gap-2 items-center py-4 cursor-pointer ${additionalClass}`}
    >
      {/* <div className="products-page-product__price flex flex-col text-sm">
        <span className="line-through">{product.price}</span>  
        <span>{product['discounted price']}</span>  
      </div> */}
      <div className="">
        {product.images && (
          <Image
            src={product.images[0]}
            alt={product.name}
            className="products-page-product__image object-cover overflow-visible"
          />
        )}
      </div>
      {/* <hr />   */}
      <div className="flex-center gap-4 pb-14">
        {product.name && (<h1 className="products-page-product__title text-2xl font-semibold">{product.name}</h1>)}
        {product.tagline && (<div className="text-center text-base">{product.tagline}</div>)}
        {/* <div className="text-center text-base font-semibold flex gap-3">
          {product.price && (<span className="line-through">{product.price}</span>  )}
          {product['discounted price'] && (<span>{product['discounted price']}</span> )}
        </div> */}
      </div>
    </Link>
  );
};

export default ProductPreview;
