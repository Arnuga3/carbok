import { Reducer } from "redux";
import { Product } from "../../../classes/product/Product";
import { ListProductActions } from "../../actions/products/interfaces/listProductInterfaces";

export interface ListProductState {
  selectedListProduct: Product | null;
  showModalOpen: boolean;
  calcModalOpen: boolean;
  deleteAlertOpen: boolean;
}

const defaultState: ListProductState = {
  showModalOpen: false,
  calcModalOpen: false,
  deleteAlertOpen: false,
  selectedListProduct: null,
};

const reducer: Reducer<ListProductState> = (
  state: ListProductState = defaultState,
  action
) => {
  switch (action.type) {
    case ListProductActions.LIST_PRODUCT_SHOW:
      return {
        ...state,
        showModalOpen: true,
        selectedListProduct: action.product,
      };

    case ListProductActions.LIST_PRODUCT_CALC:
      return {
        ...state,
        calcModalOpen: true,
        selectedListProduct: action.product,
      };

    case ListProductActions.LIST_PRODUCT_CONFIRM_DELETE:
      return {
        ...state,
        deleteAlertOpen: true,
        selectedListProduct: action.product,
      };

    case ListProductActions.LIST_PRODUCT_CLOSE:
      return {
        ...state,
        showModalOpen: false,
        calcModalOpen: false,
        deleteAlertOpen: false,
        selectedListProduct: null,
      };

    default:
      return state;
  }
};

export { reducer as listProductReducer };
