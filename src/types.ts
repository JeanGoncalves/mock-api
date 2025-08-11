export type Identifier = number;

export interface User {
  id: Identifier;
  name: string;
  email: string;
}

export interface NewUser {
  name: string;
  email: string;
}

export interface Product {
  id: Identifier;
  name: string;
  price: number;
}

export interface NewProduct {
  name: string;
  price: number;
}

export interface PostItem {
  id: Identifier;
  title: string;
  body: string;
}

export interface NewPostItem {
  title: string;
  body: string;
}

export interface DatabaseShape {
  users: User[];
  products: Product[];
  posts: PostItem[];
}


