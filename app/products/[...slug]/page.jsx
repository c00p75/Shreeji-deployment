import { getProductByName } from "@/app/data/productsData";
import LatestProductsByCategory from "@/components/products/main grid/latest products category";
import ProductDetails from "@/components/products/product details";
import ProductCategory from "@/components/products/product category";
import SideGrid from "@/components/products/side grid";
import "@/components/products/style.scss";
import LatestProductsBySubCategory from "@/components/products/main grid/latest products subcategory";
import PromotionBanner from "@/components/products/main grid/promotion banner";
import CategoryPromotionalBanner from "@/components/products/product category/category promotional banner";
import Breadcrumbs from "@/components/products/product category/breadcrumbs";

const ProductPage = async({ params }) => {
  const { slug } = await params;
  let [category, subcategory, product] =  slug;

  console.log(category, subcategory, product)
  // return <h1>page</h1>
  // let product

  // const { slug } = params; // `slug` is an array

  // Product
  let productDetails;
  let productName; 

  // Sub category
  let subcategoryName;
  
  // Category
  let categoryName;
  

  if (product) { 
    productName = decodeURIComponent(product).replace(/-/g, " "); 
    categoryName = decodeURIComponent(category).replace(/-/g, " "); 
    subcategoryName = decodeURIComponent(subcategory).replace(/-/g, " "); 
    productDetails = getProductByName(productName);
  } else if (subcategory) { 
    categoryName = decodeURIComponent(category).replace(/-/g, " "); 
    subcategoryName = decodeURIComponent(subcategory).replace(/-/g, " "); 
  } else if (category) {
    categoryName = decodeURIComponent(category).replace(/-/g, " "); 
  }

  return (
    <section className={`z-[1] products-main-section min-h-screen relative pl-5 pr-8 gap-5 pb-[2rem] text-white h-fit ${product ? 'product-details-page' : ''}`}>    
      <SideGrid />
      <section className="main-grid flex-[3] relative flex flex-col gap-5">        
        {product ? (
          <>
            <Breadcrumbs breadcrumbs={[categoryName, subcategoryName, productName]} />
            <ProductDetails product={productDetails} />
          </>
        ) : (
          subcategory ? (
            <>
              <Breadcrumbs breadcrumbs={[categoryName, subcategoryName]} />
              {/* <CategoryPromotionalBanner subcategory={subcategoryName} /> */}
              <LatestProductsBySubCategory subcategory={subcategoryName} heading={`${categoryName} > ${subcategoryName}`} />
            </>
          ) : (
            <>
              <Breadcrumbs breadcrumbs={[categoryName]} />
              <CategoryPromotionalBanner category={categoryName} />
              <LatestProductsByCategory category={categoryName} heading={categoryName} />
            </>
          )
        )}
      </section>      
    </section>
  )

  // if(slug.length === 3){
  //   let productName = decodeURIComponent(slug[slug.length-1]).replace(/-/g, " ")
  //   product = getProductByName(productName);
  //   return <ProductDetails product={product}/>
  // } 

  // if(slug.length === 2){
  //   let subCategoryName = decodeURIComponent(slug[slug.length-1]).replace(/-/g, " ")    
  //   return <div>{subCategoryName}</div>
  // } 

  // if(slug.length === 1){
  //   let categoryName = decodeURIComponent(slug[0]).replace(/-/g, " ")    
  //   return <div>{categoryName}</div>
  // } 
};

export default ProductPage;
