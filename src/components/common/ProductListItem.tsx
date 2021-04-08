import { IonText } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";

interface Props {
    product: IProduct;
}

export const ProductListItem: React.FC<Props> = ({ product }) => {
    const { t } = useTranslation();
    return (
        <ListItemContent>
                <ListItemTitle>
                  {product.name}
                  <IonText color="secondary">
                    <small> {product.carbsData.portion}
                      {t(product.units.shortNameKey)}
                      &nbsp;&middot;&nbsp;
                      {t(product.category.nameKey)}
                    </small>
                  </IonText>
                </ListItemTitle>
                <ListItemRow>
                  <Label color="medium">
                    <small>
                      {t("carbohydrates.short")}
                      <b>{` ${product.carbsData.carbs}${t(
                        "units.grams.short"
                      )}`}</b>
                    </small>
                  </Label>
                  <Label color="medium">
                    <small>
                      {t("of.which.sugars")}
                      <b>{` ${product.carbsData.sugars}${t(
                        "units.grams.short"
                      )}`}</b>
                    </small>
                  </Label>
                </ListItemRow>
              </ListItemContent>
    );
};

const ListItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`;

const ListItemTitle = styled.div`
  font-weight: bold;
`;

const ListItemRow = styled.div`
  display: flex;
`;

const Label = styled(IonText)`
  margin: 0 4px;
`;
