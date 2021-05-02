import { IonText } from "@ionic/react";
import { IProduct } from "../../classes/product/IProduct";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  product: IProduct;
  mealProduct: boolean;
}

export const ProductListItem: React.FC<Props> = ({ product, mealProduct }) => {
  const { t } = useTranslation();
  const data = product.carbsData.perPortionOn
    ? {
        ...product.carbsData.perPortion,
        portion: `${product.carbsData.perPortion.quantity} ${product.carbsData.perPortion.description}`,
      }
    : {
        ...product.carbsData.per100,
        portion: `${
          mealProduct ? product.carbsData.per100.defaultPortion : 100
        }${t(product.units.shortNameKey)}`,
      };
  return (
    <ListItemContent>
      <ContentRow>
        <NameBadge>{product.name}</NameBadge>
        <IonText color="medium">
          <small>{data.portion}</small>
        </IonText>
      </ContentRow>
      <ContentRow>
        <IonText color="medium">
          <small>{t("carbohydrates")}</small>
        </IonText>
        <IonText color="medium">
          <small>{` ${data.carbs}${t("units.grams.short")}`}</small>
        </IonText>
      </ContentRow>
      <ContentRow>
        <IonText color="medium">
          <small>{t("of.which.sugars")}</small>
        </IonText>
        <IonText color="medium">
          <small>{` ${data.sugars}${t("units.grams.short")}`}</small>
        </IonText>
      </ContentRow>
    </ListItemContent>
  );
};

const ListItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 16px 8px 0;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 90%;
`;

const NameBadge = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
`;
