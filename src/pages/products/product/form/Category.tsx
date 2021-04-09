import React from "react";
import { IonInput, IonItem, IonLabel, IonChip } from "@ionic/react";
import styled from "styled-components";
import { IProductDummy } from "../EditProduct";
import { useTranslation } from "react-i18next";

import { categories } from "../../../../resources/productCategories";
import { IProductCategory } from "../../../../classes/productCategory/IProductCategory";

interface Props {
  data: IProductDummy;
  categoryValid: boolean;
  onCategorySelect: (category: IProductCategory) => void;
}

export const Category: React.FC<Props> = ({
  data,
  categoryValid,
  onCategorySelect,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Row>
        {categories.map((category, i) => (
          <IonChipStyled
            key={i}
            outline={!!(data.category && category.type === data.category.type)}
            color={categoryValid ? category.color : "danger"}
            onClick={() => onCategorySelect(category)}
          >
            <IonLabelStyled color={category.color}>
              {t(category.nameKey)}
            </IonLabelStyled>
          </IonChipStyled>
        ))}
      </Row>
    </>
  );
};

const IonChipStyled = styled(IonChip)`
  color: ${({ color }) => color};
`;

const IonLabelStyled = styled(IonLabel)`
  color: ${({ color }) => color};
`;

const Row = styled.div`
  margin: 18px 0;
`;
