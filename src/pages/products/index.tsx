import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { useProducts } from "../../hooks/productsHook";
import { retrieveProducts } from "../../redux/actions/products/actions";
import { filterProducts } from "./util";
import { Product } from "../../classes/product/Product";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { ProductsToolbar } from "./ProductsToolbar";
import { ProductsWithState } from "./../../components/common/products";
import { ProductsSearchModal } from "../../components/common/ProductsSearchModal";
import { addOutline } from "ionicons/icons";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { products } = useProducts();
  const { settings } = useAppSettings();

  const [state, setState] = useState<{
    productsFiltered: Product[];
    openFilterAlert: boolean;
    openSearch: boolean;
  }>({
    productsFiltered: [],
    openFilterAlert: false,
    openSearch: false,
  });

  const { openSearch } = state;

  useEffect(() => {
    if (!products) {
      dispatch(retrieveProducts());
    }
  }, [products]);

  return (
    <IonPage>
      <ProductsToolbar
        onSearch={() => setState({ ...state, openSearch: true })}
        onFilert={(productsFiltered) =>
          setState({
            ...state,
            openFilterAlert: false,
            productsFiltered,
          })
        }
      />
      {products && (
        <>
          <ProductsWithState
            identifier="products-page"
            products={filterProducts(products, settings.productsFilter)}
          />
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton routerLink="/products/add-product" color="primary">
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        </>
      )}
      <ProductsSearchModal
        open={openSearch}
        onClose={() => setState({ ...state, openSearch: false })}
      />
    </IonPage>
  );
};

export default React.memo(Products);
