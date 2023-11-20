'use client'
import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import { motion } from "framer-motion";
import { uuid } from "@/lib/utils";


interface ProductListProps {
  title: string;
  items: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items
}) => {

  const carouselItems = [...items, ...items, ...items, ...items, ...items];

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
      , transition: { staggerChildren: 0.3 }
    },
  }

  const images = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  }

  return (
    <div className=" w-full h-full overflow-hidden ">
      {items.length === 0 && <NoResults />}

      <motion.ul
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex gap-4 animate-carousel">
        {carouselItems.map((item) => (
          <motion.li
            variants={images}
            key={`${item.id + uuid()}`}
            className="  w-full max-w-[300px] flex-none md:w-1/3"
          >
            <ProductCard key={item.id} data={item} />
          </motion.li>
        ))}
      </motion.ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      </div>
    </div>
  );
}

export default ProductList;
