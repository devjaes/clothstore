"use client";
import Currency from "@/components/ui/currency";
import { Product, ProductToBuy } from "@/types";
import SizeSelector from "./ui/size-selector";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const itemInCart: ProductToBuy | undefined = cart.items.find(
    (item: ProductToBuy) => item.product.id === data.id
  );

  const generateFacebookShareLink = () => {
    const productUrl = `${window.location.origin}/product/${data.id}`;
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl
    )}`;
  };

  const onShareOnFacebook = () => {
    const facebookShareLink = generateFacebookShareLink();
    window.open(facebookShareLink, "_blank");
  };

  const generateTwitterShareLink = () => {
    const productUrl = `${window.location.origin}/product/${data.id}`;
    const text = encodeURIComponent(
      `Check out this product: ${data.name} - ${productUrl}`
    );
    return `https://twitter.com/intent/tweet?text=${text}`;
  };

  const generatePinterestShareLink = () => {
    const productUrl = `${window.location.origin}/product/${data.id}`;
    const description = encodeURIComponent(data.name);
    const media = encodeURIComponent(data.images[0].url);
    return `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      productUrl
    )}&media=${media}&description=${description}`;
  };

  const onShareOnTwitter = () => {
    const twitterShareLink = generateTwitterShareLink();
    window.open(twitterShareLink, "_blank");
  };

  const onShareOnPinterest = () => {
    const pinterestShareLink = generatePinterestShareLink();
    window.open(pinterestShareLink, "_blank");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Descripción:</h3>
          <p className="text-gray-500">{data.description}</p>
          <h3 className="font-semibold text-black">Talla(s):</h3>

        </div>
        <hr />
        <div className="flex flex-col ">
          <h3 className="mb-2 font-semibold text-lg">Cantidad:</h3>
          {
            <SizeSelector
              data={data}
              selectedSizes={itemInCart ? itemInCart.selectedSizes : undefined}
            />
          }
        </div>
        <hr />
        <h2>Compartelo en:</h2>
        <div className="flex justify-center gap-16">
          <a
            onClick={onShareOnFacebook}
            className="flex items-center cursor-pointer"
          >
            Facebook
          </a>
          <a
            onClick={onShareOnTwitter}
            className="flex items-center cursor-pointer"
          >
            Twitter
          </a>
          <a
            onClick={onShareOnPinterest}
            className="flex items-center cursor-pointer"
          >
            Pinterest
          </a>
        </div>
      </div>
    </div>
  );
};

export default Info;
