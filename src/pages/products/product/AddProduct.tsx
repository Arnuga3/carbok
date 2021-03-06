import React, { useCallback, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  IonContent,
  IonPage,
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  isPlatform,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonToggle,
  IonText,
  IonList,
} from "@ionic/react";
import { arrowBackOutline, warningOutline } from "ionicons/icons";
import styled from "styled-components";

import { IProductDummy } from "../../../classes/product/IProductDummy";
import { ICarbsPerPortion } from "../../../classes/productCarbs/ICarbsPerPortion";
import { ICarbsPer100 } from "../../../classes/productCarbs/ICarbsPer100";

import { Product } from "../../../classes/product/Product";
import { Category } from "./form/Category";
import { Units } from "./form/Units";
import { CarbsPerPortionData } from "./form/CarbsPerPortionData";
import { CarbsPer100Data } from "./form/CarbsPer100Data";

import { getUnitShortKey, productUnits } from "../../../resources/productUnits";
import { addProduct } from "../../../redux/actions/products/productActions";
import { ProductCategoryType } from "../../../classes/productCategory/ProductCategoryType";
import { toggleCategory } from "../util";
import { UnitsType } from "../../../classes/units/UnitsType";

const defaultData: IProductDummy = {
  name: null,
  categories: [],
  units: productUnits[0],
  portionType: "weight",
  carbsData: {
    per100: {
      carbs: 0,
      sugars: 0,
      portion: 100,
    },
    perPortion: {
      description: undefined,
      quantity: 1,
      carbs: 0,
      sugars: 0,
    },
  },
};

export const AddProduct: React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IProductDummy>(defaultData);
  const [saveAttempted, setSaveAttempted] = useState(false);
  const [carbsDataValid, setCarbsDataValid] = useState(true);

  const handleCategorySelect = (category: ProductCategoryType) => {
    const categoriesUpdated = toggleCategory(category, product.categories);
    setProduct({ ...product, categories: categoriesUpdated });
  };

  const handlePerPortionChange = (
    perPortion: ICarbsPerPortion,
    dataValid: boolean
  ) => {
    // TODO - Make one state
    setCarbsDataValid(dataValid);
    setProduct({ ...product, carbsData: { ...product.carbsData, perPortion } });
  };

  const handlePer100Change = (per100: ICarbsPer100, dataValid: boolean) => {
    setCarbsDataValid(dataValid);
    setProduct({ ...product, carbsData: { ...product.carbsData, per100 } });
  };

  const handleSave = () => {
    setSaveAttempted(true);
    if (
      product.name &&
      nameValid() &&
      product.categories.length > 0 &&
      carbsDataValid
    ) {
      const newProduct = new Product(
        product.name,
        product.categories,
        product.units,
        product.carbsData,
        product.portionType
      );
      dispatch(addProduct(newProduct));
      history.goBack();
    }
  };

  const nameValid = useCallback(() => {
    return !saveAttempted || (product.name && product.name.trim() !== "");
  }, [product.name, saveAttempted]);

  const categoryValid = useCallback(() => {
    return !saveAttempted || product.categories.length !== 0;
  }, [product.categories, saveAttempted]);

  return (
    <IonPage>
      <IonContentStyled color="primary">
        <Header>
          <IonBackButton
            color="secondary"
            mode={isPlatform("ios") ? "ios" : "md"}
            defaultHref={`/meals`}
            icon={arrowBackOutline}
          />
          <Title color="white">
            <h5>{t("page.products.add.product.title")}</h5>
          </Title>
        </Header>
        <List>
          <Card>
            <IonCardHeader>
              <IonCardSubtitle>
                {!nameValid() && (
                  <IonIcon
                    icon={warningOutline}
                    color={nameValid() ? "primary" : "danger"}
                  />
                )}
                {t("page.products.form.name")}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonInputStyled
                value={product.name}
                onIonInput={(e: any) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </IonCardContent>
          </Card>
          <Card>
            <IonCardHeader>
              <IonCardSubtitle>
                {t("page.products.form.category")}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <Category
                data={product}
                categoryValid={categoryValid()}
                onCategoryToggle={handleCategorySelect}
              />
            </IonCardContent>
          </Card>
          <Card>
            <IonCardHeader>
              <IonCardSubtitle>{t("page.products.form.units")}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <Units
                units={product.units}
                onUnitsChange={(units: UnitsType) =>
                  setProduct({ ...product, units })
                }
              />
            </IonCardContent>
          </Card>
          <Card>
            <IonCardHeader>
              <IonCardSubtitle>
                {t("page.products.form.carbohydrates")}
                {t(getUnitShortKey(product.units))}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <CarbsPer100Data
                product={product}
                onPer100Change={handlePer100Change}
              />
            </IonCardContent>
          </Card>
          <Card>
            <CardHeader>
              <IonCardSubtitle>
                {t("page.products.form.quantity")}
              </IonCardSubtitle>
              <IonItem lines="none">
                <IonToggle
                  checked={product.portionType === "quantity"}
                  onIonChange={(e) =>
                    setProduct({
                      ...product,
                      portionType: e.detail.checked ? "quantity" : "weight",
                    })
                  }
                />
              </IonItem>
            </CardHeader>
            {product.portionType === "quantity" && (
              <IonCardContent>
                <CarbsPerPortionData
                  product={product}
                  onPerPortionChange={handlePerPortionChange}
                />
              </IonCardContent>
            )}
          </Card>
          <SaveButton
            color="secondary"
            expand="block"
            shape="round"
            onClick={handleSave}
          >
            {t("button.save")}
          </SaveButton>
        </List>
      </IonContentStyled>
    </IonPage>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled(IonText)`
  flex: 1;
`;

const IonContentStyled = styled(IonContent)`
  & .input-right-align {
    text-align: right;
  }
`;

const List = styled(IonList)`
  min-height: 100%;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
`;

const Card = styled(IonCard)`
  box-shadow: 0 0 0;
`;

const CardHeader = styled(IonCardHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SaveButton = styled(IonButton)`
  margin: 12px;
`;

const IonInputStyled = styled(IonInput)`
  border-radius: 8px;
  --background: var(--ion-color-light);
  --padding-start: 8px;
`;
