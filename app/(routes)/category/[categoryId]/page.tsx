import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";
import CategorySelector from "@/components/category-selector";

import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";
import getSizes from "@/actions/get-sizes";


import CategoryInfo from "./components/category-info";
import { Category } from "@/types";
import getCategories from "@/actions/get-categories";
import Button from "@/components/ui/button";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    sizeId: searchParams.sizeId,
    onlyAvailable: true,
  });

  const categories = await getCategories();

  const sizes = await getSizes();
  const category = await getCategory(params.categoryId);


  return (
    <div className="bg-white">
      <Container>
        <div className="flex gap-3 pt-5 pb-3 px-12">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/category/${category.id}`}
            >
              <Button>
                {category.name}
              </Button>

            </a>
          ))}
        </div>
      </Container>
      <hr className="my-4" />

      <h1 className="text-center text-3xl py-2 font-semibold">{category.name}</h1>
      <hr className="my-4 mb-8" />
      <Container>
        <CategoryInfo products={products} sizes={sizes} />
      </Container>
    </div>
  );
};

export default CategoryPage;
