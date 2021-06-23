import React, { useEffect, useMemo, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonAlert,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { CalculatorModal } from "../../components/common/CalculatorModal";
import { useProducts } from "../../hooks/productsHook";
import {
  deleteProduct,
  retrieveProducts,
} from "../../redux/actions/products/actions";
import { filterProducts } from "./util";
import { Product } from "../../classes/product/Product";
import { ProductModal } from "../../components/common/ProductModal";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { ListItem } from "./ListItem";
import { ProductsToolbar } from "./ProductsToolbar";

const Products: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, searchString } = useProducts();
  const { settings } = useAppSettings();

  const [state, setState] = useState<{
    openDeleteAlert: boolean;
    openProductModal: boolean;
    openCalculatorModal: boolean;
    productSelected: Product | null;
    productsFiltered: Product[];
    openFilterAlert: boolean;
    onTop: boolean;
  }>({
    openDeleteAlert: false,
    openProductModal: false,
    openCalculatorModal: false,
    productSelected: null,
    productsFiltered: [],
    openFilterAlert: false,
    onTop: true,
  });

  const {
    openDeleteAlert,
    openProductModal,
    openCalculatorModal,
    productSelected,
    productsFiltered,
    onTop,
  } = state;

  useEffect(() => {
    if (searchString) {
      dispatch(retrieveProducts(searchString));
    }
  }, [searchString]);

  useEffect(() => {
    if (!products) {
      dispatch(retrieveProducts());
    }
    if (products) {
      setState({
        ...state,
        productsFiltered: filterProducts(products, settings.productsFilter),
      });
    }
  }, [products]);

  const handleOnClose = () => {
    setState({
      ...state,
      productSelected: null,
      openCalculatorModal: false,
      openProductModal: false,
    });
  };

  const handleDelete = () => {
    if (productSelected) {
      dispatch(deleteProduct(productSelected.id));
      setState({
        ...state,
        productSelected: null,
      });
    }
  };

  const handleScroll = (e: any) => {
    if (e.scrollOffset === 0) {
      setState({ ...state, onTop: true });
    }
    if (e.scrollOffset !== 0) {
      setState({ ...state, onTop: false });
    }
  };

  const ProductListItem = ({ index, style }: { index: number; style: any }) => {
    const product = productsFiltered[index];
    return (
      <div style={style}>
        {productsFiltered && (
          <ListItem
            index={index}
            product={product}
            onView={(product) =>
              setState({
                ...state,
                productSelected: product,
                openProductModal: true,
              })
            }
            onCalculate={(product) =>
              setState({
                ...state,
                productSelected: product,
                openCalculatorModal: true,
              })
            }
            onDelete={(product) =>
              setState({
                ...state,
                productSelected: product,
                openDeleteAlert: true,
              })
            }
          />
        )}
      </div>
    );
  };

  const ItemsList = useMemo(() => {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <ProductsList
            onScroll={handleScroll}
            height={height}
            width={width}
            itemCount={productsFiltered ? productsFiltered.length : 0}
            overscanCount={5}
            itemSize={() => 75}
          >
            {ProductListItem}
          </ProductsList>
        )}
      </AutoSizer>
    );
  }, [productsFiltered]);

  return (
    <IonPage>
      <ProductsToolbar
        pageTop={onTop}
        onFilert={(productsFiltered) =>
          setState({
            ...state,
            openFilterAlert: false,
            productsFiltered,
          })
        }
      />
      <IonContent>
        {products && ItemsList}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton routerLink="/products/add-product" color="primary">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonAlert
        isOpen={openDeleteAlert}
        onDidDismiss={() => setState({ ...state, openDeleteAlert: false })}
        header={t("page.products.edit.product.delete.alert.title")}
        subHeader={t("page.products.edit.product.delete.alert.subtitle")}
        buttons={[
          { text: t("button.cancel"), role: "cancel" },
          {
            text: t("button.delete"),
            role: "destructive",
            handler: handleDelete,
          },
        ]}
      />
      <ProductModal
        product={productSelected}
        open={openProductModal}
        onClose={handleOnClose}
      />
      <CalculatorModal
        product={productSelected}
        open={openCalculatorModal}
        onClose={handleOnClose}
      />
    </IonPage>
  );
};

export default React.memo(Products);

const ProductsList = styled(List)`
  padding-bottom: 70px;
`;
