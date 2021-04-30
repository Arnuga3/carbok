import React, { useCallback, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  IonHeader,
  IonContent,
  IonPage,
  IonTitle,
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  isPlatform,
  IonCardHeader,
  IonCardSubtitle,
} from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import styled from "styled-components";

import { IProductCategory } from "../../../classes/productCategory/IProductCategory";
import { IUnits } from "../../../classes/units/IUnits";
import { IProductDummy } from "../../../classes/product/IProductDummy";
import { ICarbsPerPortion } from "../../../classes/productCarbs/ICarbsPerPortion";
import { ICarbsPer100 } from "../../../classes/productCarbs/ICarbsPer100";
import { PortionType } from "../../../classes/productCarbs/PortionType";

import { Product } from "../../../classes/product/Product";
import { Category } from "./form/Category";
import { Units } from "./form/Units";
import { CarbsPerPortionData } from "./form/CarbsPerPortionData";
import { CarbsPer100Data } from "./form/CarbsPer100Data";
import { CategoriesModal } from "./CategoriesModal";

import { productUnits } from "../../../resources/productUnits";
import { addProduct } from "../../../redux/actions/productsActions";

const defaultData: IProductDummy = {
  name: null,
  category: null,
  units: productUnits[0],
  carbsData: {
    per100: {
      carbs: 0,
      sugars: 0,
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
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [saveAttempted, setSaveAttempted] = useState(false);

  const handleCategorySelect = (category: IProductCategory) => {
    setProduct({ ...product, category });
    setOpenCategoryModal(false);
  };

  const handlePerPortionChange = (perPortion: ICarbsPerPortion) => {
    setProduct({ ...product, carbsData: { ...product.carbsData, perPortion } });
  };

  const handlePer100Change = (per100: ICarbsPer100) => {
    setProduct({ ...product, carbsData: { ...product.carbsData, per100 } });
  };

  // <IonSegmentStyled
  //       value={data.portionType}
  //       onIonChange={(e) => handlePortionTypeChange(e.detail.value)}
  //     >
  //       <IonSegmentButton value={PortionTypeEnum.QUANTITY}>
  //         <IonLabel>{t("page.products.portion.type.quantity")}</IonLabel>
  //       </IonSegmentButton>
  //       <IonSegmentButton value={PortionTypeEnum.WEIGTH}>
  //         <IonLabel>{t("page.products.portion.type.weight")}</IonLabel>
  //       </IonSegmentButton>
  //     </IonSegmentStyled>
  

  // const handlePortionTypeChange = (type: string | undefined) => {
  //   switch (type) {
  //     case PortionTypeEnum.WEIGTH:
  //       onPortionTypeChange(PortionTypeEnum.WEIGTH);
  //       break;
  //     case PortionTypeEnum.QUANTITY:
  //       onPortionTypeChange(PortionTypeEnum.QUANTITY);
  //       break;
  //   }
  // };

  const handlePortionTypeChange = (type: PortionType) => {
    // switch (type) {
    //   case PortionTypeEnum.WEIGTH:
    //     return setProduct({ ...product, portionType: PortionTypeEnum.WEIGTH });
    //   case PortionTypeEnum.QUANTITY:
    //     return setProduct({
    //       ...product,
    //       portionType: PortionTypeEnum.QUANTITY,
    //     });
    // }
  };

  const handleSave = () => {
    setSaveAttempted(true);
    // const carbsDataValid = portionValid() && carbsValid() && sugarsValid();

    if (product.category && product.name/* && carbsDataValid*/) {
      const newProduct = new Product(
        product.name,
        product.category,
        product.units,
        product.carbsData,
      );
      dispatch(addProduct(newProduct));
      history.goBack();
    }
  };

  const nameValid = useCallback(() => {
    return !saveAttempted || (product.name && product.name.trim() !== "");
  }, [product.name, saveAttempted]);

  const categoryValid = useCallback(() => {
    return !saveAttempted || product.category !== null;
  }, [product.category, saveAttempted]);

  // const portionValid = useCallback(() => {
  //   return product.portion > 0;
  // }, [product.portion]);

  return (
    <IonPage>
      <IonHeader mode="ios" translucent>
        <HeaderContent>
          <IonBackButton
            mode={isPlatform("ios") ? "ios" : "md"}
            defaultHref="/products"
            text={t("button.back")}
            color="primary"
          />
          <IonTitle color="medium">
            {t("page.products.add.product.title")}
          </IonTitle>
        </HeaderContent>
      </IonHeader>
      <IonContentStyled fullscreen>
        <IonCard>
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
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              {t("page.products.form.category")}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <Category
              data={product}
              categoryValid={categoryValid()}
              onCategorySelect={handleCategorySelect}
            />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{t("page.products.form.units")}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <Units
              units={product.units}
              onUnitsChange={(units: IUnits) =>
                setProduct({ ...product, units })
              }
            />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              {t("page.products.form.portion.and.carbohydrates")}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <CarbsPerPortionData
              product={product}
              onPerPortionChange={handlePerPortionChange}
            />
          </IonCardContent>
          <IonCardContent>
            <CarbsPer100Data
              product={product}
              onPer100Change={handlePer100Change}
            />
          </IonCardContent>
        </IonCard>
        <SaveButton
          color="primary"
          expand="block"
          shape="round"
          onClick={handleSave}
        >
          {t("button.save")}
        </SaveButton>
      </IonContentStyled>
      <CategoriesModal
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        onSelect={handleCategorySelect}
      />
    </IonPage>
  );
};

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const IonContentStyled = styled(IonContent)`
  & .input-right-align {
    text-align: right;
  }
`;

const SaveButton = styled(IonButton)`
  margin: 12px;
`;

const IonInputStyled = styled(IonInput)`
  border-radius: 8px;
  --background: var(--ion-color-light);
  --padding-start: 8px;
`;
