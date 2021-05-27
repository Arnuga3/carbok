import { IonText } from "@ionic/react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";
import { getUnitShortKey } from "../../resources/productUnits";

interface Props {
  product: IProduct;
}

export const ProductListItem: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const data =
    product.portionType === "quantity"
      ? {
          ...product.carbsData.perPortion,
          portion: `${product.carbsData.perPortion.quantity} ${
            product.carbsData.perPortion.description ?? ""
          }`,
        }
      : {
          ...product.carbsData.per100,
          portion: `100${t(getUnitShortKey(product.units.type))}`,
        };
  return (
    <ListItemContent>
      <ContentRowFirst>
        <NameBadge>{product.name}</NameBadge>
        <IonText color="medium">
          <small>{data.portion}</small>
        </IonText>
      </ContentRowFirst>
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
  padding: 4px 16px 4px 0;
`;

const ContentRowFirst = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 80%;
`;

const NameBadge = styled.div`
  display: flex;
  align-items: center;
`;
