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
      className={`products-page-product md:mr-2 px-5 flex flex-col gap-2 items-center py-4 cursor-pointer ${additionalClass}`}
    >
      <div className="">
        {product.images && (
          <Image
            src={product.images[0]}
            alt={product.name}
            className="products-page-product__image object-cover overflow-visible product-shadow"
          />
        )}
      </div>
      <div className="flex-center gap-4 pb-14">
        {product.name && (<h1 className="products-page-product__title text-2xl font-semibold line-clamp-2">{product.name}</h1>)}
        {product.tagline && (<div className="text-center text-base">{product.tagline}</div>)}
      </div>
    </Link>
  );
};

export default ProductPreview;
