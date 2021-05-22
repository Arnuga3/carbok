import { transformToIProductDB, transformToIProducts } from "../database/productTransformer";
import { db, IProductDB } from "../database/CarbokDB";
import { IProduct } from "../classes/product/IProduct";

class DataService {
  /* products */
  public async retrieveProducts(
    limit: number,
    offset: number,
    searchText: string | null
  ): Promise<IProduct[]> {
    const result = searchText
        ? await this.searchAndGetProductsChunk(limit, offset, searchText)
        : await this.getProductsChunk(limit, offset);
    return transformToIProducts(result);
  }

  private async searchAndGetProductsChunk(
    limit: number,
    offset: number,
    searchText: string
  ): Promise<IProductDB[]> {
    const regex = new RegExp(searchText);
    return await db.products
      .filter((prod) => regex.test(prod.name.toLowerCase()))
      .offset(offset)
      .limit(limit)
      .toArray();
  }

  private async getProductsChunk(limit: number, offset: number): Promise<IProductDB[]> {
    return await db.products
      .orderBy("name")
      .offset(offset)
      .limit(limit)
      .toArray();
  }

  public async saveProduct(product: IProduct): Promise<void> {
    await db.products.update(product.id as any, transformToIProductDB(product));
  }

  public async updateProduct(product: IProduct): Promise<void> {
    await db.products.put(transformToIProductDB(product));
  }

  public async deleteProduct(id: any) {
    await db.products.delete(id);
  }
  /* end products */
}

export const dataService = new DataService();
