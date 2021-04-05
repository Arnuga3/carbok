import { Plugins } from "@capacitor/core";
import { IProduct } from "../interfaces/IProduct";

const { Storage } = Plugins;
const productsStorageKey = "products";

export const ProductsStorage = {
  getAll,
  get,
  save,
  update,
  remove,
};

async function getAll(): Promise<IProduct[] | null> {
  const { value } = await Storage.get({ key: productsStorageKey });
  return value ? JSON.parse(value) : null;
}

async function get(id: string): Promise<IProduct | null> {
  const products = await getAll();
  if (products) {
    const product = products.find((product: IProduct) => product.id === id);
    return product ? product : null;
  }
  return null;
}

async function set(products: IProduct[]): Promise<void> {
  await Storage.set({
    key: productsStorageKey,
    value: JSON.stringify(products),
  });
}

async function save(product: IProduct): Promise<void> {
  const products = await getAll();
  products ? await set([...products, product]) : await set([product]);
}

async function update(product: IProduct): Promise<void> {
  const products = await getAll();
  if (products) {
    const productsUpdated = products.map((prod) =>
      prod.id === product.id ? { ...prod, ...product } : prod
    );
    await set(productsUpdated);
  } else {
    await set([product]);
  }
}

async function remove(id: string): Promise<void> {
  const products = await getAll();
  if (products) {
    const productsUpdated = products.filter(
      (product: IProduct) => product.id !== id
    );
    await set(productsUpdated);
  }
}
