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

    return (
        <div className="bg-white">
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
