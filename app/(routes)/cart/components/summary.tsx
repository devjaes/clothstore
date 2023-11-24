"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { OrderRegistration } from "@/types";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
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
          `Hola, mi nombre es ${form.clientName} ${
            form.clientLastName
          } estoy interesado en los siguientes productos:\n${items
            .map(
              (item) =>
                `----------------------------\nProducto: ${
                  item.product.name
                }, \nPrecio: ${item.product.price}\n
              ${item.selectedSizes
                .filter((size) => size != null && size != undefined)
                .map((size) =>
                  size.quantity !== 0 || item.selectedSizes != null
                    ? `Talla: ${size.size}: ${size.quantity}`
                    : ""
                )
                .filter(Boolean)
                .join("\n")}`
            )
            .join("\n")}`
        )}`
      : "";
    return enlaceWpp;
  }

  console.log(items.map((item) => item.selectedSizes));

  const onCheckout = async () => {
    const orderGeneration: OrderRegistration = {
      clientName: form.clientName,
      clientLastName: form.clientLastName,
      clientEmail: form.clientEmail,
      productsToBuy: items,
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

    console.log(response.data.url);

    router.push(generateWhatsAppShareLink());
    //window.location = response.data.url;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
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

        <label>Correo electrónico:</label>
        <input
          type="text"
          name="clientEmail"
          value={form.clientEmail}
          onChange={handleChange}
          className="rounded-full border border-primaryBlack p-1 px-5"
        />
      </form>

      <a onClick={onCheckout} target="_blank">
        <Button
          className="w-full mt-6"
          disabled={
            items.length === 0 ||
            totalPrice === 0 ||
            !form.clientName ||
            !form.clientLastName
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
  );
};

export default Summary;
