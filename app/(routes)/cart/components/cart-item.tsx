import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { ProductToBuy } from "@/types";
import SizeSelector from "@/components/ui/size-selector";
interface CartItemProps {
  data: ProductToBuy;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const price = useCart((state) => {
    const item = state.items.find(
      (item) => item.product.id === data.product.id
    );
    return item?.totalPrice;
  });

  const onRemove = () => {
    cart.removeItem(data.product.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.product.name}
            </p>
          </div>

          <Currency value={price} />

          <div className="flex flex-col mt-5">
            <h3>Cantidad:</h3>
            <SizeSelector
              data={data.product}
              CartView
              selectedSizes={data.selectedSizes}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
