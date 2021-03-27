import { Reducer } from "redux";
import { IProductCategory } from "../../interfaces/IProductCategory";

export interface ProductCategoriesState {
    categories: IProductCategory[],
}

const defaultState: ProductCategoriesState = {
  categories: [
    {
      type: 'grains',
      nameKey: 'product.category.grains',
      descriptionKey: 'product.category.grains.description',
      color: '#ff9f1c',
    },
    {
      type: 'fruit',
      nameKey: 'product.category.fruit',
      descriptionKey: 'product.category.fruit.description',
      color: '#80b918',
    },
    {
      type: 'vegetables',
      nameKey: 'product.category.vegetables',
      descriptionKey: 'product.category.vegetables.description',
      color: '#2b9348',
    },
    {
      type: 'protein',
      nameKey: 'product.category.protein',
      descriptionKey: 'product.category.protein.description',
      color: '#997b66',
    },
    {
      type: 'dairy',
      nameKey: 'product.category.dairy',
      descriptionKey: 'product.category.dairy.description',
      color: '#d4c7b0',
    },
    {
      type: 'sweets',
      nameKey: 'product.category.sweets',
      descriptionKey: 'product.category.sweets.description',
      color: '#9d4edd',
    },
    {
      type: 'other',
      nameKey: 'product.category.other',
      descriptionKey: 'product.category.other.description',
      color: '#219ebc',
    },
  ],
};

const reducer: Reducer<ProductCategoriesState> = (state: ProductCategoriesState = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export {reducer as productCategoriesReducer};
