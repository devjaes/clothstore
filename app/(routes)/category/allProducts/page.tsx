import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";

import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";
import getSizes from "@/actions/get-sizes";
import CategoryInfo from "../[categoryId]/components/category-info";

import Filter from "../[categoryId]/components/filter";
import MobileFilters from "../[categoryId]/components/mobile-filters";
import GridBillboard from "@/components/ui/grid-billboard";
import getCategories from "@/actions/get-categories";
import Button from "@/components/ui/button";

export const revalidate = 0;

interface CategoryPageProps {

    searchParams: {
        sizeId: string;
    };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    searchParams,
}) => {
    const products = await getProducts({
        sizeId: searchParams.sizeId,
    });
    const sizes = await getSizes();
    const categories = await getCategories();

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

            <h1 className="text-center text-3xl py-2 font-semibold">Todos los productos</h1>
            <hr className="my-4 mb-8" />
            <Container>
                <CategoryInfo products={products} sizes={sizes} />
            </Container>
        </div>
    );
};

export default CategoryPage;
