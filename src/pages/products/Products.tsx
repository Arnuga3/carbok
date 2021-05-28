import React, { useEffect, useMemo, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonItem,
  IonButtons,
  IonIcon,
  IonItemOptions,
  IonItemSliding,
  IonItemOption,
  IonAlert,
  IonAvatar,
} from "@ionic/react";
import {
  addOutline,
  calculator,
  createOutline,
  trashOutline,
} from "ionicons/icons";
import { IProduct } from "../../classes/product/IProduct";
import { CalculatorModal } from "./CalculatorModal";
import { ProductsSearch } from "../../components/common/ProductsSearch";
import { ProductListItem } from "../../components/common/ProductListItem";
import { useProducts } from "../../hooks/productsHook";
import {
  deleteProduct,
  retrieveProducts,
} from "../../redux/actions/products/actions";
import { CircleBadge } from "../../components/common/CircleBadge";
import { categoryColours } from "../../resources/config";
import { getCatKey } from "../../resources/productCategories";

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

const Products: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, searchString } = useProducts();

  const [state, setState] = useState<{
    openDeleteAlert: boolean;
    openCalculatorModal: boolean;
    productSelected: IProduct | null;
  }>({
    openDeleteAlert: false,
    openCalculatorModal: false,
    productSelected: null,
  });

  const { openDeleteAlert, openCalculatorModal, productSelected } = state;

  useEffect(() => {
    dispatch(retrieveProducts(searchString));
  }, [searchString]);

  const handleOnCalculate = (product: IProduct) => {
    setState({
      ...state,
      productSelected: product,
      openCalculatorModal: true,
    });
  };

  const handleOnDelete = (product: IProduct) => {
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
    <div style={style}>
      <IonItemSliding
        key={index}
        id={PRODUCTSPAGE + index}
        onClick={() => toggleActionsSlide(PRODUCTSPAGE + index)}
      >
        <Item detail lines="none">
          <IonAvatar slot="start">
            <CircleBadge
              color={categoryColours[products[index].category.type]}
              size={35}
            >
              {t(getCatKey(products[index].category.type)).slice(0, 3)}
            </CircleBadge>
          </IonAvatar>
          <ProductListItem product={products[index]} />
        </Item>
        <IonItemOptions>
          <SlidingAction
            color="secondary"
            onClick={() => handleOnCalculate(products[index])}
          >
            <IonIcon icon={calculator} slot="icon-only" />
          </SlidingAction>
          <SlidingAction
            color="tertiary"
            routerLink={`/products/edit-product/${products[index].id}`}
          >
            <IonIcon icon={createOutline} slot="icon-only" />
          </SlidingAction>
          <SlidingAction
            color="danger"
            onClick={() => handleOnDelete(products[index])}
          >
            <IonIcon icon={trashOutline} slot="icon-only" />
          </SlidingAction>
        </IonItemOptions>
      </IonItemSliding>
    </div>
  );

  const ItemsList = useMemo(() => {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={products.length}
            overscanCount={20}
            itemSize={() => 70}
          >
            {ItemRow}
          </List>
        )}
      </AutoSizer>
    );
  }, [products]);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <HeaderContent>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              shape="round"
              color="primary"
              onClick={() => setState({ ...state, openCalculatorModal: true })}
            >
              <IonIcon slot="icon-only" icon={calculator} />
            </IonButton>
          </IonButtons>
          <ProductsSearch />
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              shape="round"
              color="primary"
              routerLink="/products/add-product"
            >
              <IonIcon icon={addOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </HeaderContent>
      </IonHeader>
      <IonContent fullscreen>
        {ItemsList}
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
    </IonPage>
  );
};

export default React.memo(Products);

const Item = styled(IonItem)`
  --min-height: 70px;
`;

const HeaderContent = styled.div`
  display: flex;
  padding: 0 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SlidingAction = styled(IonItemOption)`
  width: 75px;
`;
