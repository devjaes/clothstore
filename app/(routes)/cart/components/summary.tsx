"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { OrderRegistration, ProductToBuy } from "@/types";
import { set } from "date-fns";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientLastName: "",
    clientEmail: "",
    country: "Ecuador",
  });
  const router = useRouter();

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


  function generateWhatsAppShareLink() {
    const enlaceWpp = items
      ? `https://wa.me/593984198999?text=${encodeURIComponent(
        `Hola, mi nombre es ${form.clientName} ${form.clientLastName
        } y mi correo es ${form.clientEmail} estoy interesado en los siguientes productos:\n${items
          .map(
            (item) => {
              const sizesWithQuantity = item.selectedSizes
                .filter((size) => size != null && size != undefined && size.quantity !== 0);

              const totalProductPrice = sizesWithQuantity
                .reduce((total, size) => total + Number(size.quantity) * Number(item.product.price), 0);

              return `----------------------------\nProducto: ${item.product.name
                }, \nPrecio unitario: ${item.product.price}\n${sizesWithQuantity
                  .map((size) =>
                    `${size.size.name}: ${size.quantity}`
                  )
                  .join("\n").trim()
                }\nPrecio total del producto: ${totalProductPrice.toFixed(2)}`;
            }
          )
          .join("\n")}\n-----------------------------\nPrecio total de la orden: ${items.reduce((total, item) => {
            const sizesWithQuantity = item.selectedSizes
              .filter((size) => size != null && size != undefined && size.quantity !== 0);

            return total + sizesWithQuantity
              .reduce((total, size) => total + Number(size.quantity) * Number(item.product.price), 0);
          }, 0).toFixed(2)}`
      )}`
      : "";
    return enlaceWpp;
  }

  console.log(items.map((item) => item.selectedSizes));

  const onCheckout = async () => {
    setIsLoading(true);

    const productsToBuy: ProductToBuy[] = items.map((item) => ({
      product: item.product,
      selectedSizes: item.selectedSizes.filter(
        (size) => size != null && size != undefined
      ),
      totalPrice: item.totalPrice,
    })) as ProductToBuy[];

    const orderGeneration: OrderRegistration = {
      clientName: form.clientName,
      clientLastName: form.clientLastName,
      clientEmail: form.clientEmail,
      productsToBuy: productsToBuy,
      total: items.reduce((total, item) => {
        return total + Number(item.totalPrice);
      }, 0),
    };

    console.log(orderGeneration);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        orderRegistration: orderGeneration,
      }
    );

    setIsLoading(false);


    window.open(generateWhatsAppShareLink(), '_blank');
    //window.location = response.data.url;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {isLoading && <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"> <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primaryBlack"></div></div>}
      <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              Total de la orden
            </div>
            <Currency value={totalPrice} />
          </div>
        </div>
        <hr className="my-4" />

        <form className="flex flex-col gap-2">
          <h1 className="text-center text-2xl font-semibold">
            Información personal
          </h1>
          <label>Nombre:</label>
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            className="rounded-full border border-primaryBlack p-1 px-5"
          />

          <label>Apellido:</label>
          <input
            type="text"
            name="clientLastName"
            value={form.clientLastName}
            onChange={handleChange}
            className="rounded-full border border-primaryBlack p-1 px-5"
          />

          <label>Correo electrónico:</label>
          <input
            type="text"
            name="clientEmail"
            value={form.clientEmail}
            onChange={handleChange}
            className="rounded-full border border-primaryBlack p-1 px-5"
          />
          <label>País:</label>
          <input
            type="text"
            name="country"
            value={form.country}
            readOnly
            className="rounded-full border border-primaryBlack p-1 px-5"
          />
          <p className="text-sm text-red-600">
            *Actualmente realizamos envíos solo en Ecuador
          </p>

        </form>

        <a onClick={onCheckout} target="_blank">
          <Button
            className="w-full mt-6"
            disabled={
              items.length === 0 ||
              totalPrice === 0 ||
              !form.clientName ||
              !form.clientLastName ||
              !form.clientEmail
            }
          >
            Checkout
          </Button>
        </a>
        <p className="text-sm text-gray-500 mt-4">
          Al hacer click en el boton de checkout, serás redirigido a WhatsApp para
          completar tu orden.
        </p>
      </div>
    </>
  );
};

export default Summary;
