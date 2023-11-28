export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: string;
  isFeatured: boolean;
  sizes: ProductSize[];
  images: Image[];
}

export interface ProductToBuy {
  product: Product;
  selectedSizes: { size: Size; quantity: number }[];
  totalPrice: number;
}

export interface Image {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface ProductSize {
  id: string;
  size: Size;
  quantity: number;
}

export interface OrderRegistration {
  productsToBuy:   ProductToBuy[];
  total:      number;
  clientName:      string;
  clientLastName:  string;
  clientEmail:     string;
}
