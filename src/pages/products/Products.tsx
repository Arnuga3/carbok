import React, { useEffect, useState } from "react";
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
  IonTitle,
} from "@ionic/react";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";
import { useProducts } from "../../hooks/productsHook";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  retrieveProducts,
} from "../../redux/actions/productsActions";
import { ProductsSearch } from "../../components/common/ProductsSearch";
import { ProductListItem } from "../../components/common/ProductListItem";
import { add, createOutline, trashOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

const MEALSPAGE = "meals-page";

export const Products: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useProducts();

  const [searchResult, setSearchResult] = useState(products);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [productForDelete, setProductForDelete] = useState<IProduct | null>(
    null
  );

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

  const handleDeletePressed = (product: IProduct) => {
    setProductForDelete(product);
    setOpenDeleteAlert(true);
  };

  const handleDelete = () => {
    if (productForDelete) {
      dispatch(deleteProduct(productForDelete.id));
      setProductForDelete(null);
    }
  };

  return (
    <IonPage>
      <IonHeader slot="fixed">
        <IonToolbar color="primary">
          <IonTitle>{t("page.products.title")}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" routerLink="/products/add-product">
              <IonIcon icon={add} slot="icon-only" color="secondary" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color="primary">
          <ProductsSearch products={products} onSearchComplete={handleSearch} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {searchResult.map((product: IProduct, i: number) => (
            <IonItemSliding
              key={i}
              id={product.name + i + MEALSPAGE}
              onClick={() => toggleActionsSlide(product.name + i + MEALSPAGE)}
            >
              <IonItem detail>
                <ProductListItem product={product} />
              </IonItem>
              <IonItemOptions>
                <SlidingAction
                  color="secondary"
                  routerLink={`/products/edit-product/${product.id}`}
                >
                  <IonIcon icon={createOutline} />
                </SlidingAction>
                <SlidingAction
                  color="danger"
                  onClick={() => handleDeletePressed(product)}
                >
                  <IonIcon icon={trashOutline} />
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
    </IonPage>
  );
};

const SlidingAction = styled(IonItemOption)`
  width: 75px;
`;
