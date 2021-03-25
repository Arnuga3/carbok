export interface ProductsState {
  products: [];
}

const defaultState: ProductsState = {
  products: [],
};

const productsState = (state = defaultState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productsState;
