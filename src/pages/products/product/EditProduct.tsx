import React, { useCallback, useState } from "react";
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
import styled from "styled-components";
import { updateProduct } from "../../../redux/actions/products/productActions";
import { Category } from "./form/Category";
import { Units } from "./form/Units";
import { CarbsPerPortionData } from "./form/CarbsPerPortionData";
import { arrowBackOutline, warningOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import { useProducts } from "../../../hooks/productsHook";
import { getUnitShortKey, productUnits } from "../../../resources/productUnits";
import { IProductDummy } from "../../../classes/product/IProductDummy";
import { ICarbsPer100 } from "../../../classes/productCarbs/ICarbsPer100";
import { ICarbsPerPortion } from "../../../classes/productCarbs/ICarbsPerPortion";
import { CarbsPer100Data } from "./form/CarbsPer100Data";
import { ProductCategoryType } from "../../../classes/productCategory/ProductCategoryType";
import { toggleCategory } from "../util";
import { UnitsType } from "../../../classes/units/UnitsType";
import { Product } from "../../../classes/product/Product";

interface EditProductPageProps extends RouteComponentProps<{ id: string }> {}

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

export const EditProduct: React.FC<EditProductPageProps> = ({
  history,
  match,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { products } = useProducts();
  const productRetrieved: Product | undefined = products
    ? products.find((product: Product) => product.id === match.params.id)
    : undefined;
  let prod = defaultData;

  if (productRetrieved) {
    prod = {
      id: productRetrieved.id,
      name: productRetrieved.name,
      categories: productRetrieved.categories,
      units: productRetrieved.units,
      carbsData: productRetrieved.carbsData,
      portionType: productRetrieved.portionType,
    };
  }

  const [product, setProduct] = useState(prod);
  const [saveAttempted, setSaveAttempted] = useState(false);
  const [carbsDataValid, setCarbsDataValid] = useState(true);

  const handleCategoryToggle = (category: ProductCategoryType) => {
    const categoriesUpdated = toggleCategory(category, product.categories);
    setProduct({ ...product, categories: categoriesUpdated });
  };

  const handlePerPortionChange = (
    perPortion: ICarbsPerPortion,
    dataValid: boolean
  ) => {
    setCarbsDataValid(dataValid);
    setProduct({ ...product, carbsData: { ...product.carbsData, perPortion } });
  };

  const handlePer100Change = (per100: ICarbsPer100, dataValid: boolean) => {
    setCarbsDataValid(dataValid);
    setProduct({ ...product, carbsData: { ...product.carbsData, per100 } });
  };

  const handleUpdate = () => {
    setSaveAttempted(true);
    if (product.id && product.categories && product.name && carbsDataValid) {
      const productUpdated: Product = {
        id: product.id,
        name: product.name,
        categories: product.categories,
        units: product.units,
        carbsData: product.carbsData,
        portionType: product.portionType,
      };
      dispatch(updateProduct(productUpdated));
      history.goBack();
    }
  };

  const nameValid = useCallback(() => {
    return !saveAttempted || (product.name && product.name.trim() !== "");
  }, [product.name, saveAttempted]);

  const categoryValid = useCallback(() => {
    return !saveAttempted || product.categories !== null;
  }, [product.categories, saveAttempted]);

  return (
    <IonPage>
      <Content color="primary">
        <Header>
          <IonBackButton
            color="secondary"
            mode={isPlatform("ios") ? "ios" : "md"}
            defaultHref={`/meals`}
            icon={arrowBackOutline}
          />
          <Title color="white">
            <h5>{t("page.products.edit.product.title")}</h5>
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
                onCategoryToggle={handleCategoryToggle}
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
          <Button
            color="primary"
            expand="block"
            shape="round"
            fill="solid"
            onClick={handleUpdate}
          >
            {t("button.save")}
          </Button>
        </List>
      </Content>
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

const Content = styled(IonContent)`
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

const Button = styled(IonButton)`
  margin: 12px;
`;

const IonInputStyled = styled(IonInput)`
  border-radius: 8px;
  --background: var(--ion-color-light);
  --padding-start: 8px;
`;
