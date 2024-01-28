"use client";
import { Product, Size } from "@/types";
import Filter from "./filter";
import MobileFilters from "./mobile-filters";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { motion } from "framer-motion";


interface CategoryInfoProps {
    products: Product[];
    sizes: Size[];
}

//animaciones
const variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const productAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const filterAnimation = {
    hidden: { opacity: 0, y: 225 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};



export default function CategoryInfo({ products, sizes }: CategoryInfoProps) {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="px-4 sm:px-6 lg:px-8 pb-24">
            <div
                className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                <MobileFilters sizes={sizes} />
                <motion.div
                    variants={filterAnimation}
                    initial="hidden"
                    animate="visible"
                    className="hidden lg:block">
                    <Filter valueKey="sizeId" name="Sizes" data={sizes} />
                </motion.div>
                <div
                    className="mt-6 lg:col-span-4 lg:mt-0"
                >
                    {products.length === 0 && <NoResults />}
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map((item) => (
                            <motion.div
                                variants={productAnimation}
                                key={item.id}
                                className="flex flex-col"
                            >
                                <ProductCard key={item.id} data={item} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
