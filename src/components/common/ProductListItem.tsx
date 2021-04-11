import { IonText } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";
import { CircleBadge } from "./CircleBadge";

interface Props {
  product: IProduct;
}

export const ProductListItem: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  return (
    <ListItemContent>
      <ContentRow>
        <NameBadge>
          <CircleBadge color={product.category.color} />
          <strong>{product.name}</strong>
        </NameBadge>
        <IonText color="medium">
          <small>
            {` ${product.carbsData.portion}${t(product.units.shortNameKey)}`}
          </small>
        </IonText>
      </ContentRow>
      <ContentRow>
        <IonText color="medium">
          <small>{t("carbohydrates")}</small>
        </IonText>
        <IonText color="medium">
          <small>
            {` ${product.carbsData.carbs}${t("units.grams.short")}`}
          </small>
        </IonText>
      </ContentRow>
      <ContentRow>
        <IonText color="medium">
          <small>{t("of.which.sugars")}</small>
        </IonText>
        <IonText color="medium">
          <small>
            {` ${product.carbsData.sugars}${t("units.grams.short")}`}
          </small>
        </IonText>
      </ContentRow>
    </ListItemContent>
  );
};

const ListItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 90%;
`;

const NameBadge = styled.div`
  display: flex;
  align-items: center;
`;
