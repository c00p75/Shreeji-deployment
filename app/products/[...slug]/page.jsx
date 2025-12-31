import {
  getProductByName,
  getProductBySlug,
  randomProduct,
  subcategoryExists,
} from "@/app/lib/client/products";
import ProductDetails from "@/components/products/product details";
import SideGrid from "@/components/products/side grid";
import "@/components/products/style.scss";
import Breadcrumbs from "@/components/products/product category/breadcrumbs";
import ProductList from "@/components/products/product category/product list";
import PrimaryPromotionalBanner from "@/components/products/main grid/primary promotional banner";
import ProductDetailsWithEdit from "../../components/products/ProductDetailsWithEdit";
import ProductRecommendationsWrapper from "@/app/components/products/ProductRecommendationsWrapper";

const ProductPage = async ({ params }) => {
  const { slug } = await params;
  let [category, subcategory, product] = slug || [];

  // Ensure variables are defined to avoid errors
  subcategory = subcategory || "";
  product = product || "";

  // Product
  let productDetails = null;
  let productName;

  // Sub category
  let subcategoryName;

  // Category
  let categoryName;

  if (product) {
    productName = decodeURIComponent(product);
    categoryName = decodeURIComponent(category)
    subcategoryName = decodeURIComponent(subcategory)
    // Try to get by slug first, then by name
    try {
      productDetails = await getProductBySlug(productName) || await getProductByName(productName);
    } catch (error) {
      console.error('Error fetching product:', error);
      productDetails = null;
    }
  } else if (subcategory) {
    categoryName = decodeURIComponent(category)
    subcategoryName = decodeURIComponent(subcategory)
    const exists = await subcategoryExists(subcategoryName);
    if(!exists){
      productName = subcategory;
      try {
        productDetails = await getProductBySlug(subcategoryName) || await getProductByName(subcategoryName);
      } catch (error) {
        console.error('Error fetching product:', error);
        productDetails = null;
      }
    };
  } else if (category) {
    categoryName = decodeURIComponent(category)
  }

  // Dedicated hero layout for individual product view
  if (product && productDetails) {
    return (
      <>
        <section style={{ backgroundImage: `url(/backgrounds/product-details-bg.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="products-main-section product-details-page relative z-[1] h-fit min-h-screen gap-5 pl-1 pr-1 text-white md:pr-8 pb-[5rem]">
          <SideGrid />
          <section className="main-grid relative flex flex-[3] flex-col gap-5 overflow-visible">
            <Breadcrumbs breadcrumbs={[categoryName, subcategoryName, productName]} />
            <ProductDetailsWithEdit
              product={productDetails}
              breadcrumbs={[categoryName, subcategoryName, productName].filter(Boolean)}
            />
          </section>
        </section>
        {productDetails?.id && (
          <div className="w-full pt-10 pb-[5rem] bg-[var(--shreeji-primary)]">
            <ProductRecommendationsWrapper productId={productDetails.id} />
          </div>
        )}
      </>
    );
  }

  return (
    <section className="products-main-section relative z-[1] h-fit min-h-screen gap-5 pb-[2rem] pl-1 pr-1 text-white md:pr-8">
      <SideGrid />
      <section className="main-grid relative flex flex-[3] flex-col gap-5 overflow-visible">
        {subcategory ? (
          (await subcategoryExists(subcategoryName)) ? (
            <>
              <Breadcrumbs breadcrumbs={[categoryName, subcategoryName]} />
              <PrimaryPromotionalBanner promoProduct={await randomProduct("subcategory", subcategoryName, 1)} />
              <ProductList filterBy="subcategory" filter={subcategoryName} />
            </>
          ) : (
            <>
              <section className="products-main-section product-details-page relative z-[1] h-fit min-h-screen gap-5 pb-[2rem] pl-1 pr-1 text-white md:pr-8">
                <SideGrid />
                <section className="main-grid relative flex flex-[3] flex-col gap-5 overflow-visible">
                  <Breadcrumbs breadcrumbs={[categoryName, productName]} />
                  <ProductDetails product={productDetails} />
                </section>
              </section>
              {productDetails?.id && (
                <div className="w-full py-10 bg-[var(--shreeji-primary)]">
                  <ProductRecommendationsWrapper productId={productDetails.id} />
                </div>
              )}
            </>
          )
        ) : (
          <>
            <Breadcrumbs breadcrumbs={[categoryName]} />
            <PrimaryPromotionalBanner promoProduct={await randomProduct("category", categoryName, 1)} />
            <ProductList filterBy="category" filter={categoryName} />
          </>
        )}
      </section>
    </section>
  );
};

export default ProductPage;
