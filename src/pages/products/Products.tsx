import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonList,
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
  add,
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
} from "../../redux/actions/productsActions";
import { CircleBadge } from "../../components/common/CircleBadge";

const PRODUCTSPAGE = "products-page";

export const Products: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useProducts();

  const [searchResult, setSearchResult] = useState(products);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openCalculatorModal, setOpenCalculatorModal] = useState(false);
  const [productSelected, setProductSelected] = useState<IProduct | null>(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(retrieveProducts());
    }
  }, []);

  useEffect(() => {
    if (products && products.length !== 0) {
      setSearchResult(products);
    }
  }, [products]);

  const handleSearch = (result: IProduct[]) => setSearchResult(result);

  const toggleActionsSlide = async (selector: string) => {
    const productEl: any = document.querySelector("#" + selector);
    const openItemNum = await productEl.getOpenAmount();
    if (productEl && openItemNum === 0) {
      productEl.open();
    } else {
      productEl.close();
    }
  };

  const handleOnCalculate = (product: IProduct) => {
    setProductSelected(product);
    setOpenCalculatorModal(true);
  };

  const handleOnDelete = (product: IProduct) => {
    setProductSelected(product);
    setOpenDeleteAlert(true);
  };

  const handleDelete = () => {
    if (productSelected) {
      dispatch(deleteProduct(productSelected.id));
      setProductSelected(null);
    }
  };

  const handleOnClose = () => {
    setProductSelected(null);
    setOpenCalculatorModal(false);
  };

  return (
    <IonPage>
      <IonHeader mode="ios" translucent>
        <HeaderContent>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              shape="round"
              color="primary"
              onClick={() => setOpenCalculatorModal(true)}
            >
              <IonIcon slot="icon-only" icon={calculator} />
            </IonButton>
          </IonButtons>
          <ProductsSearch products={products} onSearchComplete={handleSearch} />
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
        <IonList>
          {searchResult
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product: IProduct, i: number) => (
              <IonItemSliding
                key={i}
                id={PRODUCTSPAGE + i}
                onClick={() => toggleActionsSlide(PRODUCTSPAGE + i)}
              >
                <IonItem detail>
                  <IonAvatar slot="start">
                    <CircleBadge color={product.category.color} size={40}>
                      {t(product.category.nameKey).slice(0, 3)}
                    </CircleBadge>
                  </IonAvatar>
                  <ProductListItem product={product} />
                </IonItem>
                <IonItemOptions>
                  <SlidingAction
                    color="secondary"
                    onClick={() => handleOnCalculate(product)}
                  >
                    <IonIcon icon={calculator} slot="icon-only" />
                  </SlidingAction>
                  <SlidingAction
                    color="tertiary"
                    routerLink={`/products/edit-product/${product.id}`}
                  >
                    <IonIcon icon={createOutline} slot="icon-only" />
                  </SlidingAction>
                  <SlidingAction
                    color="danger"
                    onClick={() => handleOnDelete(product)}
                  >
                    <IonIcon icon={trashOutline} slot="icon-only" />
                  </SlidingAction>
                </IonItemOptions>
              </IonItemSliding>
            ))}
        </IonList>
      </IonContent>
      <IonAlert
        isOpen={openDeleteAlert}
        onDidDismiss={() => setOpenDeleteAlert(false)}
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

const HeaderContent = styled.div`
  display: flex;
  padding: 0 8px;
`;

const SlidingAction = styled(IonItemOption)`
  width: 75px;
`;
