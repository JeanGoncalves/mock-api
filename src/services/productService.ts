import { Product, NewProduct } from "../schemas/productSchemas";
import { loadCollection, findById, getNextId } from "../routes/utils";

export class ProductService {
  async getProducts(): Promise<Product[]> {
    return loadCollection<Product>("products");
  }

  async getProductById(id: number): Promise<Product | null> {
    const products = loadCollection<Product>("products");
    return findById(products, id) || null;
  }

  async createProduct(productData: NewProduct): Promise<Product> {
    const products = loadCollection<Product>("products");
    const newProduct: Product = {
      id: getNextId(products),
      ...productData
    };
    
    products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id: number, productData: NewProduct): Promise<Product | null> {
    const products = loadCollection<Product>("products");
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return null;
    }

    const updatedProduct: Product = {
      id,
      ...productData
    };
    
    products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const products = loadCollection<Product>("products");
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return false;
    }

    products.splice(productIndex, 1);
    return true;
  }
}
