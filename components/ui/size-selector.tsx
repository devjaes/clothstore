"use client";

import useCart from "@/hooks/use-cart";
import { Product, ProductSize, ProductToBuy } from "@/types";
import React, { useEffect } from "react";
import { IntegerInput } from "./integer-number";
import Button from "./button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { sk } from "date-fns/locale";

interface sizeSelectorProps {
  data: Product;
  CartView?: boolean;
  selectedSizes?: ProductToBuy["selectedSizes"];
}

export default function SizeSelector({
  data,
  CartView,
  selectedSizes,
}: sizeSelectorProps) {
  const cart = useCart();
  const itemsInCart: ProductToBuy[] = cart.items;

  // Check if the product is already in the cart
  const itemInCart = itemsInCart.find(
    (item: ProductToBuy) => item.product.id === data.id
  );

  // Copy the object with sizes quantity = 0

  const [quantitys, setQuantitys] = React.useState(
    selectedSizes
      ? selectedSizes
      : data.sizes.map((size) => {
          return { size: size.size, quantity: 0 };
        })
  );

  const [totalPrice, setTotalPrice] = React.useState(0);

  const onQuantityChange = (index: any, newValue: number) => {
    const newQuantitys = [...quantitys];
    newQuantitys[index].quantity = newValue;
    setQuantitys(newQuantitys);

    const newTotalPrice = newQuantitys
      .map((item) => {
        if (item == undefined || item == null) return 0;
        return Number(data.price) * item.quantity;
      })
      .reduce((total, item) => total + item, 0);
    setTotalPrice(newTotalPrice);

    if (itemInCart) {
      cart.updateItem({
        product: data,
        selectedSizes: newQuantitys,
        totalPrice: newTotalPrice,
      });
    }
  };

  const onAddToCart = () => {
    cart.addItem({ product: data, selectedSizes: quantitys, totalPrice });
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {data.sizes.map((size, index) => {
          if (size.quantity > 0) {
            return (
              <div
                key={index}
                className="flex flex-row justify-between items-center w-full"
              >
                <div className="flex flex-row items-center flex-1 ">
                  <span className="text-sm">{size.size.name}</span>
                </div>
                <div className="flex-1">
                  <IntegerInput
                    value={String(quantitys[index].quantity)}
                    maxIntegerValue={size.quantity}
                    disabled={CartView ? false : itemInCart != undefined}
                    onChange={(e) => {
                      if (CartView) {
                        if (e.target.value == "1") {
                          return;
                        }
                      }
                      onQuantityChange(
                        index,
                        parseInt(e.target.value, 10) || 0
                      );
                    }}
                    onMaxIntegerValue="No hay mas unidades disponibles"
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
      <div
        className={cn(
          "mt-10 flex items-center gap-x-3",
          CartView ? "hidden" : ""
        )}
      >
        <Button
          onClick={onAddToCart}
          className="flex items-center gap-x-2"
          disabled={itemInCart != undefined || totalPrice == 0}
        >
          {itemInCart != undefined
            ? "Este producto ya esta en el carrito"
            : "Añadir al carrito"}
          <ShoppingCart size={20} />
        </Button>
        {!itemInCart && (
          <span className="text-lg font-semibold">
            {totalPrice > 0 ? `Total: ${totalPrice}€` : ""}
          </span>
        )}
      </div>
    </div>
  );
}
