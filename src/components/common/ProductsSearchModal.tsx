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
import { Search } from "./Search";
import { dataService } from "../../services/DataService";
import { Product } from "../../classes/product/Product";
import { ProductsWithState } from "./products";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ProductsSearchModal: React.FC<Props> = ({ open, onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async (searchTerm: string) => {
    const productsFound = await dataService.retrieveProducts(searchTerm);
    setProducts(productsFound);
  };

  useEffect(() => {
    setProducts([]);
  }, [open]);

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
            <ProductsWithState
              identifier="products-page-search"
              products={products}
            />
          </>
        )}
      </IonContent>
    </IonModal>
  );
};
