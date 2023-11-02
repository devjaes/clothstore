import Image from "next/image";
import coat from "/public/coat.png";

function ShirtCard() {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-md shadow-md relative w-full h-full">
      <Image
        src={coat}
        alt="Camiseta"
        layout="fill"
        objectFit="contain"
        className="absolute inset-0 rounded-md"
      />

      <div className="absolute bottom-4 left-4">
        <div className="bg-primaryRed p-3 w-16">
          <p className="font-bold text-fontColorWhite">78.3</p>
        </div>
        <div className="bg-primaryBlack p-3 w-full">
          <p className="font-semibold text-fontColorWhite">Camiseta</p>
        </div>
      </div>
    </div>
  );
}

export default ShirtCard;
