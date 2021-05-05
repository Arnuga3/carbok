import { IonText } from "@ionic/react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IMealProduct } from "../../classes/meal/IMealProduct";

interface Props {
  product: IMealProduct;
}

export const MealProductListItem: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const data =
    product.portionTypeInUse === "quantity"
      ? {
          ...product.mealProductCarbs.perPortion,
          portion: `${product.mealProductCarbs.perPortion.quantity} ${
            product.mealProductCarbs.perPortion.description ?? ""
          }`,
        }
      : {
          ...product.mealProductCarbs.per100,
          portion: `${product.mealProductCarbs.per100.portion}${t(
            product.units.shortNameKey
          )}`,
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
