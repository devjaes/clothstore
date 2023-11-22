import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";

import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";
import getSizes from "@/actions/get-sizes";

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
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters sizes={sizes} />
                        <div className="hidden lg:block">
                            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategoryPage;
