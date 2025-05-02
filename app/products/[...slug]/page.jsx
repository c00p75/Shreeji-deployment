import { getProductByName, randomProduct, subcategoryExists } from "@/data/productsData";
import ProductDetails from "@/components/products/product details";
import SideGrid from "@/components/products/side grid";
import "@/components/products/style.scss";
import Breadcrumbs from "@/components/products/product category/breadcrumbs";
import ProductList from "@/components/products/product category/product list";
import PrimaryPromotionalBanner from "@/components/products/main grid/primary promotional banner";
// import '@/components/products/product details/style.scss'

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
    if(!subcategoryExists(subcategoryName)){
      productName = subcategory;
      productDetails = getProductByName(subcategoryName);
    };
  } else if (category) {
    categoryName = decodeURIComponent(category)
  }

  return (
    <section
      className={`z-[1] products-main-section min-h-screen relative pl-1 pr-1 md:pr-8 gap-5 pb-[2rem] text-white h-fit ${
        productName ? "product-details-page" : ""
      }`}
    >
      <SideGrid />
      <section className="main-grid overflow-visible flex-[3] relative flex flex-col gap-5">
        {product ? (
          <>
            <Breadcrumbs breadcrumbs={[categoryName, subcategoryName, productName]} />
            <ProductDetails product={productDetails} />
          </>
        ) : subcategory ? (
          subcategoryExists(subcategory) ? (
            <>
              <Breadcrumbs breadcrumbs={[categoryName, subcategoryName]} />
              <PrimaryPromotionalBanner promoProduct={randomProduct('subcategory', subcategoryName, 1)} />
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
            <PrimaryPromotionalBanner promoProduct={randomProduct('category', categoryName, 1)} />
            <ProductList filterBy="category" filter={categoryName} />
          </>
        )}
      </section>
    </section>
  );
};

export default ProductPage;
