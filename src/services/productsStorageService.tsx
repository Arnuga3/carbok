import { Plugins } from "@capacitor/core";
import { IProduct } from "../classes/product/IProduct";

const { Storage } = Plugins;
const productsStorageKey = "products";

export class ProductsStorageService {
  private key: string;

  constructor(key: string = productsStorageKey) {
    this.key = key;
  }

  public async exportData(): Promise<IProduct[]> {
    const { value } = await Storage.get({ key: this.key });
    return value ? JSON.parse(value) : [];
  }

  public async importData(data: IProduct[]): Promise<void> {
    await Storage.set({
      key: this.key,
      value: JSON.stringify(data),
    });
  }

  public async getAll(): Promise<IProduct[] | null> {
    const { value } = await Storage.get({ key: this.key });
    return value ? JSON.parse(value) : null;
  }
  
  public async get(id: string): Promise<IProduct | null> {
    const products = await this.getAll();
    if (products) {
      const product = products.find((product: IProduct) => product.id === id);
      return product ? product : null;
    }
    return null;
  }
  
  private async set(products: IProduct[]): Promise<void> {
    await Storage.set({
      key: this.key,
      value: JSON.stringify(products),
    });
  }
  
  public async save(product: IProduct): Promise<void> {
    const products = await this.getAll();
    products ? await this.set([...products, product]) : await this.set([product]);
  }
  
  public async update(product: IProduct): Promise<void> {
    const products = await this.getAll();
    if (products) {
      const productsUpdated = products.map((prod) =>
        prod.id === product.id ? { ...prod, ...product } : prod
      );
      await this.set(productsUpdated);
    } else {
      await this.set([product]);
    }
  }
  
  public async remove(id: string): Promise<void> {
    const products = await this.getAll();
    if (products) {
      const productsUpdated = products.filter(
        (product: IProduct) => product.id !== id
      );
      await this.set(productsUpdated);
    }
  }
}
