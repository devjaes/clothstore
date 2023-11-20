export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  sizes: ProductSize[];
  images: Image[]
};

export interface Image {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface ProductSize {
  id: string;
  size: Size;
  quantity: number;
};
