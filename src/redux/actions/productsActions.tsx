import { IProduct } from "../../interfaces/IProduct";

export enum ProductsActions {
    ADD_PRODUCT = 'ADD_PRODUCT',
}

interface AddProduct {
    type: ProductsActions.ADD_PRODUCT,
    product: IProduct
}

export const addProduct = (product: IProduct): AddProduct => ({type: ProductsActions.ADD_PRODUCT, product});

export type ProductsActionType = AddProduct;