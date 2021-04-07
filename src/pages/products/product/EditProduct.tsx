import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  IonHeader,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import styled from "styled-components";
import { CategorySelectModal } from "./CategorySelectModal";
import { IProductCategory } from "../../../classes/productCategory/IProductCategory";
import { deleteProduct, updateProduct } from "../../../redux/actions/productsActions";
import { MainData } from "./form/MainData";
import { UnitsData } from "./form/UnitsData";
import { CarbsData, NumericInput } from "./form/CarbsData";
import { warningOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import { Product } from "../../../classes/product/Product";
import { IUnits } from "../../../classes/units/IUnits";
import { ProductCarbs } from "../../../classes/productCarbs/ProductCarbs";
import { IProduct } from "../../../classes/product/IProduct";
import { useProducts } from "../../../hooks/productsHook";
import { productUnits } from "../../../resources/productUnits";

interface EditProductPageProps extends RouteComponentProps<{ id: string }> {}

export interface IProductDummy {
  id?: string;
  name: string | null;
  category: IProductCategory | null;
  units: IUnits;
  portion: number;
  defaultPortion: number;
  carbs: number;
  sugars: number;
}

const defaultData: IProductDummy = {
  name: null,
  category: null,
  units: productUnits[0],
  portion: 100,
  defaultPortion: 100,
  carbs: 0,
  sugars: 0,
};

export const EditProduct: React.FC<EditProductPageProps> = ({
  history,
  match,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { products } = useProducts();
  const productRetrieved: IProduct | undefined = products.find(
    (product: IProduct) => product.id === match.params.id
  );
  let product = defaultData;

  if (productRetrieved) {
    product = {
      id: productRetrieved.id,
      name: productRetrieved.name,
      category: productRetrieved.category,
      units: productRetrieved.units,
      portion: productRetrieved.carbsData.portion,
      defaultPortion:
        productRetrieved.carbsData.defaultPortion ?? defaultData.defaultPortion,
      carbs: productRetrieved.carbsData.carbs,
      sugars: productRetrieved.carbsData.sugars,
    };
  }

  const [data, setData] = useState(product);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [saveAttempted, setSaveAttempted] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleCategorySelect = (category: IProductCategory) => {
    setData({ ...data, category });
    setOpenCategoryModal(false);
  };

  const handleNumberInputChange = (type: NumericInput, value: any) => {
    switch (type) {
      case NumericInput.PORTION:
        return setData({ ...data, portion: parseFloat(value) });
      case NumericInput.CARBS:
        return setData({ ...data, carbs: parseFloat(value) });
      case NumericInput.SUGARS:
        return setData({ ...data, sugars: parseFloat(value) });
      case NumericInput.DEFAULT_PORTION:
        return setData({ ...data, defaultPortion: parseFloat(value) });
    }
  };

  const handleUpdate = () => {
    setSaveAttempted(true);
    const carbsDataValid = portionValid() && carbsValid() && sugarsValid();

    if (data.id && data.category && data.name && carbsDataValid) {
      const productCarbs = new ProductCarbs(
        data.portion,
        data.carbs,
        data.sugars,
        data.defaultPortion
      );
      const product: IProduct = {
        id: data.id,
        name: data.name,
        category: data.category,
        units: data.units,
        carbsData: productCarbs,
      };
      dispatch(updateProduct(product));
      history.goBack();
    }
  };

  const handleDelete = () => {
    if (data.id) {
      dispatch(deleteProduct(data.id));
      history.goBack();
    }
  };

  const nameValid = useCallback(() => {
    return !saveAttempted || (data.name && data.name.trim() !== "");
  }, [data.name, saveAttempted]);

  const categoryValid = useCallback(() => {
    return !saveAttempted || data.category !== null;
  }, [data.category, saveAttempted]);

  const portionValid = useCallback(() => {
    return data.portion > 0;
  }, [data.portion]);

  const carbsValid = useCallback(() => {
    return data.carbs >= 0 && data.carbs <= data.portion;
  }, [data.carbs, data.portion]);

  const sugarsValid = useCallback(() => {
    return data.sugars >= 0 && data.sugars <= data.carbs;
  }, [data.carbs, data.sugars]);

  return (
    <IonPage>
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/products" text={t("button.back")} />
            </IonButtons>
            <IonTitle>{t("page.products.edit.product.title")}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardContent>
            <Row>
              <IonLabel color={nameValid() ? "" : "danger"}>
                {!nameValid() && <IonIcon icon={warningOutline} />}
                {t("page.products.form.name")}
              </IonLabel>
              <MainData
                data={data}
                categoryValid={categoryValid()}
                onNameChange={(name: string) => setData({ ...data, name })}
                onCategoryModalOpen={() => setOpenCategoryModal(true)}
              />
            </Row>
            <Row>
              <IonLabel>{t("page.products.form.units")}</IonLabel>
              <UnitsData
                units={data.units}
                onUnitsChange={(units: IUnits) => setData({ ...data, units })}
              />
            </Row>
            <Row>
              <IonLabel>
                {t("page.products.form.portion.and.carbohydrates")}
              </IonLabel>
              <CarbsData
                data={data}
                portionValid={portionValid()}
                carbsValid={carbsValid()}
                sugarsValid={sugarsValid()}
                onNumericDataChange={handleNumberInputChange}
              />
            </Row>
            <ButtonGroup>
              <Button
                color="danger"
                size="large"
                expand="block"
                shape="round"
                onClick={() => setOpenDeleteAlert(true)}
              >
                {t("button.delete")}
              </Button>
              <Button
                size="large"
                expand="block"
                shape="round"
                onClick={handleUpdate}
              >
                {t("button.update")}
              </Button>
            </ButtonGroup>
          </IonCardContent>
        </IonCard>
      </IonContentStyled>
      <CategorySelectModal
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        onSelect={handleCategorySelect}
      />
      <IonAlert
          isOpen={openDeleteAlert}
          onDidDismiss={() => setOpenDeleteAlert(false)}
          header={t("page.products.edit.product.delete.alert.title")}
          subHeader={t("page.products.edit.product.delete.alert.subtitle")}
          buttons={[
            { text: t("button.cancel") },
            {
              text: t("button.delete"),
              handler: handleDelete,
            }
          ]}
        />
    </IonPage>
  );
};

const IonContentStyled = styled(IonContent)`
  --padding-top: 60px;

  & .input-right-align {
    text-align: right;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 28px;
`;

const Button = styled(IonButton)`
  flex: 1;
`;

const Row = styled.div`
  margin-top: 12px;
`;
