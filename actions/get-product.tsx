import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`, { headers: corsHeaders });

  return res.json();
};

export default getProduct;
