import { getProductByName } from "@/app/data/productsData";
import ProductDetails from "@/components/products/product details";

const ProductPage = ({ params }) => {
  let product

  const { slug } = params; // `slug` is an array

  if(slug.length === 3){
    let productName = decodeURIComponent(slug[slug.length-1]).replace(/-/g, " ")
    product = getProductByName(productName);
    return <ProductDetails product={product}/>
  } 

  if(slug.length === 2){
    let subCategoryName = decodeURIComponent(slug[slug.length-1]).replace(/-/g, " ")
    
    return <div>{subCategoryName}</div>
  } 

  if(slug.length === 1){
    let categoryName = decodeURIComponent(slug[0]).replace(/-/g, " ")
    
    return <div>{categoryName}</div>
  } 
};

export default ProductPage;
