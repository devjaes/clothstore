"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.totalPrice);
  }, 0);

  const enlaceWhatsApp = `https://wa.me/593984198999?text=${encodeURIComponent(
    `Hola, mi nombre es [INGRESA TU NOMBRE] estoy interesado en los siguientes productos:\n${items
      .map(
        (item) =>
          `----------------------------\nProducto: ${item.product.name}, \nPrecio:${item.product.price}`
      )
      .join("\n")}`
  )}`;

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.product.id),
      }
    );

    console.log(response.data.url);

    //window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <a href={enlaceWhatsApp} onClick={onCheckout} target="_blank">
        <Button className="w-full mt-6" disabled={items.length === 0 || totalPrice === 0}>Checkout</Button>
      </a>
    </div>
  );
};

export default Summary;
