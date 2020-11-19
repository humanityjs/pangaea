export interface IProduct {
  id: number;
  title: string;
  image_url: string;
  price: number;
}

export interface ICart extends IProduct {
  quantity: number;
}