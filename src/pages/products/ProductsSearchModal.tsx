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

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ProductsSearchModal: React.FC<Props> = ({ open, onClose }) => {
  const { settings } = useAppSettings();
  const [products, setProducts] = useState<Product[]>([]);
  
  document.addEventListener("ionBackButton", () => {
    onClose();
  });

  useEffect(() => {
    setProducts([]);
  }, [open]);
  
  const handleSearch = async (searchTerm: string) => {
    const productsFound = await dataService.retrieveProducts(searchTerm);
    const productsFiltered = filterProducts(productsFound, settings.productsFilter);
    setProducts(productsFiltered);
  };

  return (
    <IonModal isOpen={open} onWillDismiss={onClose}>
      <IonContent>
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
              <Search
                onSearchChange={handleSearch}
                onClear={() => setProducts([])}
              />
            </IonToolbar>
            <ProductsListWithActions
              identifier="products-page-search"
              products={products}
            />
          </>
        )}
      </IonContent>
    </IonModal>
  );
};
