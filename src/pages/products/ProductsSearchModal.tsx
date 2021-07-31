import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { Search } from "../../components/common/Search";
import { dataService } from "../../services/DataService";
import { Product } from "../../classes/product/Product";
import { ProductsListWithActions } from "../../components/common/products/productsListWithActions/ProductsListWithActions";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { filterProducts } from "./util";
import { NoResult } from "../../components/common/products/NoResult";
import { useSearchHistory } from "../../hooks/searchHistoryHook";
import { SearchHistoryList } from "../../components/common/SearchHistoryList";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface State {
  products: Product[];
  searchText: string | null;
}

export const ProductsSearchModal: React.FC<Props> = ({ open, onClose }) => {
  const { settings } = useAppSettings();
  const [searched, setSearched, refresh] = useSearchHistory();

  const [state, setState] = useState<State>({
    products: [],
    searchText: null,
  });
  const { products, searchText } = state;

  useEffect(() => {
    if (!open) {
      reset();
    }
    refresh();
  }, [open]);

  useEffect(() => {
    document.addEventListener("ionBackButton", () => onClose());
    return () => document.removeEventListener("ionBackButton", () => onClose());
  }, [open]);

  const search = async (searchText: string) => {
    const productsFound = await dataService.retrieveProducts(searchText);
    const productsFiltered = filterProducts(
      productsFound,
      settings.productsFilter
    );
    setState({ products: productsFiltered, searchText });
  };

  const reset = () => {
    setState({ products: [], searchText: null });
  };

  return (
    <IonModal isOpen={open} onWillDismiss={onClose}>
      {open && (
        <>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color="medium"
                fill="clear"
                expand="block"
                shape="round"
                onClick={onClose}
              >
                <IonIcon icon={arrowBack} slot="icon-only" />
              </IonButton>
            </IonButtons>
            <Search value={searchText} onSearch={search} onClear={reset} />
          </IonToolbar>
          {products.length > 0 && (
            <ProductsListWithActions
              identifier="products-page-search"
              products={products}
            />
          )}
          {state.products.length === 0 && searched && searched.length > 0 && (
            <IonContent>
              <SearchHistoryList
                items={searched}
                onClick={(text: string) => search(text)}
              />
            </IonContent>
          )}
          {state.products.length === 0 && !searched && <NoResult />}
        </>
      )}
    </IonModal>
  );
};
