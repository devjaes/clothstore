import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import GridBillboard from "@/components/ui/grid-billboard";
import Hero from "@/components/homePageHero";
import PageWrapper from "@/components/pageWrapper";
import CategorySelector from "@/components/category-selector";
import getCategories from "@/actions/get-categories";
import AboutUs from "@/components/about-us";
export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const categories = await getCategories();

  return (
    <PageWrapper>
      <Hero />
      <div className="flex flex-col px-4 sm:px-6 lg:px-8 h-fit ">
        <ProductList title="Featured Products" items={products} />
      </div>
      <CategorySelector items={categories} />
      <AboutUs />
    </PageWrapper>
  );
};

export default HomePage;
