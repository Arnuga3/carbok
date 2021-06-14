import React, { useEffect, useMemo, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonIcon,
  IonItemOptions,
  IonItemSliding,
  IonItemOption,
  IonAlert,
  IonAvatar,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import {
  addOutline,
  calculator,
  createOutline,
  filterOutline,
  trashOutline,
} from "ionicons/icons";
import { CalculatorModal } from "./CalculatorModal";
import { ProductsSearch } from "../../components/common/ProductsSearch";
import { ProductListItem } from "../../components/common/ProductListItem";
import { useProducts } from "../../hooks/productsHook";
import {
  deleteProduct,
  retrieveProducts,
  setSearchString,
} from "../../redux/actions/products/actions";
import { CircleBadge } from "../../components/common/CircleBadge";
import { categoryColours } from "../../resources/config";
import { getCatKey } from "../../resources/productCategories";
import { CircleBadgeMultiColor } from "../../components/common/CircleBadgeMultiColor";
import { getCategoriesColours } from "./util";
import { Product } from "../../classes/product/Product";
import { FilterAlert } from "./FilterAlert";

const PRODUCTSPAGE = "products-page";

async function toggleActionsSlide(selector: string) {
  const productEl: any = document.querySelector("#" + selector);
  const openItemNum = await productEl.getOpenAmount();
  if (productEl && openItemNum === 0) {
    productEl.open();
  } else {
    productEl.close();
  }
}

function addFakeProduct(products: Product[]): Product[] {
  return products[0] ? [products[0], ...products] : [];
}

const Products: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, searchString } = useProducts();

  const [state, setState] = useState<{
    openDeleteAlert: boolean;
    openCalculatorModal: boolean;
    productSelected: Product | null;
    displayAll: boolean;
    productsFiltered: Product[];
    openFilterAlert: boolean;
  }>({
    openDeleteAlert: false,
    openCalculatorModal: false,
    productSelected: null,
    displayAll: true,
    productsFiltered: [],
    openFilterAlert: false,
  });

  const {
    openDeleteAlert,
    openCalculatorModal,
    productSelected,
    displayAll,
    productsFiltered,
  } = state;

  useEffect(() => {
    if (searchString) {
      dispatch(retrieveProducts(searchString));
    }
    return () => {
      dispatch(setSearchString(null));
    };
  }, [searchString]);

  useEffect(() => {
    if (!products) {
      dispatch(retrieveProducts());
    }
    if (products) {
      setState({
        ...state,
        productsFiltered: displayAll
          ? addFakeProduct(products)
          : addFakeProduct(products.filter((product) => !product.standard)),
      });
    }
  }, [products]);

  const handleOnCalculate = (product: Product) => {
    setState({
      ...state,
      productSelected: product,
      openCalculatorModal: true,
    });
  };

  const handleOnDelete = (product: Product) => {
    setState({
      ...state,
      productSelected: product,
      openDeleteAlert: true,
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

  const handleOnClose = () => {
    setState({
      ...state,
      productSelected: null,
      openCalculatorModal: false,
    });
  };

  const ItemRow = ({ index, style }: { index: number; style: any }) => (
    <Animation style={style}>
      {productsFiltered && (
        <IonItemSliding
          key={index}
          id={PRODUCTSPAGE + index}
          onClick={() => toggleActionsSlide(PRODUCTSPAGE + index)}
        >
          <Item detail lines="none">
            <IonAvatar slot="start">
              {productsFiltered[index].categories.length === 1 && (
                <CircleBadge
                  color={categoryColours[productsFiltered[index].categories[0]]}
                  size={40}
                >
                  {t(getCatKey(productsFiltered[index].categories[0])).slice(
                    0,
                    3
                  )}
                </CircleBadge>
              )}
              {productsFiltered[index].categories.length > 1 && (
                <CircleBadgeMultiColor
                  colors={getCategoriesColours(
                    productsFiltered[index].categories
                  )}
                  size={40}
                >
                  {t(getCatKey("mix"))}
                </CircleBadgeMultiColor>
              )}
            </IonAvatar>
            <ProductListItem product={productsFiltered[index]} />
          </Item>
          <IonItemOptions>
            <SlidingAction
              color="secondary"
              onClick={() => handleOnCalculate(productsFiltered[index])}
            >
              <IonIcon icon={calculator} slot="icon-only" />
            </SlidingAction>
            <SlidingAction
              color="tertiary"
              routerLink={`/products/edit-product/${productsFiltered[index].id}`}
            >
              <IonIcon icon={createOutline} slot="icon-only" />
            </SlidingAction>
            <SlidingAction
              color="danger"
              onClick={() => handleOnDelete(productsFiltered[index])}
            >
              <IonIcon icon={trashOutline} slot="icon-only" />
            </SlidingAction>
          </IonItemOptions>
        </IonItemSliding>
      )}
    </Animation>
  );

  const ItemsList = useMemo(() => {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <ProductsList
            height={height}
            width={width}
            itemCount={productsFiltered ? productsFiltered.length : 0}
            overscanCount={3}
            itemSize={() => 70}
          >
            {ItemRow}
          </ProductsList>
        )}
      </AutoSizer>
    );
  }, [productsFiltered]);
  console.log(state);
  return (
    <IonPage>
      <IonContent>
        <Header>
          <IonButton
            color="warning"
            fill="clear"
            size="small"
            shape="round"
            onClick={() => setState({ ...state, openCalculatorModal: true })}
          >
            <IonIcon slot="icon-only" icon={calculator} />
          </IonButton>
          <ProductsSearch />
          <IonButton
            color="warning"
            fill="clear"
            size="small"
            shape="round"
            onClick={() => setState({ ...state, openFilterAlert: true })}
          >
            <IonIcon slot="icon-only" icon={filterOutline} />
          </IonButton>
        </Header>
        {products && ItemsList}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton routerLink="/products/add-product" color="tertiary">
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
      <CalculatorModal
        product={productSelected}
        open={openCalculatorModal}
        onClose={handleOnClose}
      />
      <FilterAlert
        open={state.openFilterAlert}
        onClose={() => setState({ ...state, openFilterAlert: false })}
        value={state.displayAll ? "all" : "my"}
        onFilter={(filter: string) =>
          setState({
            ...state,
            openFilterAlert: false,
            displayAll: filter === "all",
            productsFiltered:
              filter === "all"
                ? products ?? []
                : products
                ? products.filter((product) => !product.standard)
                : [],
          })
        }
      />
    </IonPage>
  );
};

export default React.memo(Products);

const Animation = styled.div`
  // animation-name: fade;
  // animation-duration: 1s;

  // @keyframes fade {
  //   from {
  //   }
  //   to {
  //   }
  // }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  background-color: var(--ion-color-tertiary);
  position: fixed;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6);
  z-index: 99;
`;

const ProductsList = styled(List)`
  padding-bottom: 65px;
`;

const Item = styled(IonItem)`
  --min-height: 70px;
`;

const SlidingAction = styled(IonItemOption)`
  width: 75px;
`;
