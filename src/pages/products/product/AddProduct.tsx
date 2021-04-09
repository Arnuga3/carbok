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
  IonInput,
  IonItem,
} from "@ionic/react";
import styled from "styled-components";
import { CategoriesModal } from "./CategoriesModal";
import { IProductCategory } from "../../../classes/productCategory/IProductCategory";
import { addProduct } from "../../../redux/actions/productsActions";
import { Category } from "./form/Category";
import { Units } from "./form/Units";
import { CarbsData, NumericInput } from "./form/CarbsData";
import { warningOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import { Product } from "../../../classes/product/Product";
import { IUnits } from "../../../classes/units/IUnits";
import { ProductCarbs } from "../../../classes/productCarbs/ProductCarbs";

import { productUnits } from "../../../resources/productUnits";

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

export const AddProduct: React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState(defaultData);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [saveAttempted, setSaveAttempted] = useState(false);

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

  const handleSave = () => {
    setSaveAttempted(true);
    const carbsDataValid = portionValid() && carbsValid() && sugarsValid();

    if (data.category && data.name && carbsDataValid) {
      const porductCarbs = new ProductCarbs(
        data.portion,
        data.carbs,
        data.sugars,
        data.defaultPortion
      );
      const product = new Product(
        data.name,
        data.category,
        data.units,
        porductCarbs
      );
      dispatch(addProduct(product));
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
      <IonHeader slot="fixed">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/products" text={t("button.back")} />
          </IonButtons>
          <IonTitle>{t("page.products.add.product.title")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContentStyled>
        <IonCard>
          <IonCardContent>
            <Row>
              <IonLabel color={nameValid() ? "" : "danger"}>
                {!nameValid() && <IonIcon icon={warningOutline} />}
                {t("page.products.form.name")}
              </IonLabel>
              <IonInputStyled
                value={data.name}
                onIonInput={(e: any) =>
                  setData({ ...data, name: e.target.value })
                }
              />
            </Row>
            <Row>
              <IonLabel color={categoryValid() ? "" : "danger"}>
                {t("page.products.form.category")}
              </IonLabel>
              <Category
                data={data}
                categoryValid={categoryValid()}
                onCategorySelect={handleCategorySelect}
              />
            </Row>
            <Row>
              <IonLabel>{t("page.products.form.units")}</IonLabel>
              <Units
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
            <SaveButton
              size="large"
              expand="block"
              shape="round"
              onClick={handleSave}
            >
              {t("button.save")}
            </SaveButton>
          </IonCardContent>
        </IonCard>
      </IonContentStyled>
      <CategoriesModal
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        onSelect={handleCategorySelect}
      />
    </IonPage>
  );
};

const IonContentStyled = styled(IonContent)`
  & .input-right-align {
    text-align: right;
  }
`;

const SaveButton = styled(IonButton)`
  margin-top: 28px;
`;

const Row = styled.div`
  margin-top: 12px;
`;

const IonInputStyled = styled(IonInput)`
  border-radius: 8px;
  --background: var(--ion-color-light);
  --padding-end: 8px;
`;
