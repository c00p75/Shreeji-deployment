import { getProductByName, subcategoryExists } from "@/app/data/productsData";
import LatestProductsByCategory from "@/components/products/main grid/latest products category";
import ProductDetails from "@/components/products/product details";
import ProductCategory from "@/components/products/product category";
import SideGrid from "@/components/products/side grid";
import "@/components/products/style.scss";
import LatestProductsBySubCategory from "@/components/products/main grid/latest products subcategory";
import PromotionBanner from "@/components/products/main grid/promotion banner";
import CategoryPromotionalBanner from "@/components/products/product category/category promotional banner";
import Breadcrumbs from "@/components/products/product category/breadcrumbs";
import ProductList from "@/components/products/product category/product list";

const ProductPage = async ({ params }) => {
  const { slug } = params;
  let [category, subcategory, product] = slug || [];

  // Ensure variables are defined to avoid errors
  subcategory = subcategory || "";
  product = product || "";

  // Product
  let productDetails;
  let productName;

  // Sub category
  let subcategoryName;

  // Category
  let categoryName;

  if (product) {
    productName = decodeURIComponent(product);
    categoryName = decodeURIComponent(category)
    subcategoryName = decodeURIComponent(subcategory)
    productDetails = getProductByName(productName);
  } else if (subcategory) {
    categoryName = decodeURIComponent(category)
    subcategoryName = decodeURIComponent(subcategory)
    console.log('category', subcategoryName)
    if(!subcategoryExists(subcategory)){
      productName = subcategory;
      productDetails = getProductByName(subcategoryName);
      console.log(productDetails)
    };
  } else if (category) {
    categoryName = decodeURIComponent(category)
  }

  return (
    <section
      className={`z-[1] products-main-section min-h-screen relative pl-5 pr-8 gap-5 pb-[2rem] text-white h-fit ${
        product ? "product-details-page" : ""
      }`}
    >
      <SideGrid />
      <section className="main-grid flex-[3] relative flex flex-col gap-5">
        {product ? (
          <>
            <Breadcrumbs breadcrumbs={[categoryName, subcategoryName, productName]} />
            <ProductDetails product={productDetails} />
          </>
        ) : subcategory ? (
          subcategoryExists(subcategory) ? (
            <>
              <Breadcrumbs breadcrumbs={[categoryName, subcategoryName]} />
              <CategoryPromotionalBanner subcategory={subcategoryName} />
              <ProductList filterBy="subcategory" filter={subcategoryName} />
            </>
          ) : (
            <>
              <Breadcrumbs breadcrumbs={[categoryName, productName]} />
              <ProductDetails product={productDetails} />
            </>
          )
        ) : (
          <>
            <Breadcrumbs breadcrumbs={[categoryName]} />
            <CategoryPromotionalBanner category={categoryName} />
            <ProductList filterBy="category" filter={categoryName} />
          </>
        )}
      </section>
    </section>
  );
};

export default ProductPage;
