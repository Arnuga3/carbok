import React from "react";
import { useTranslation } from "react-i18next";
import { IonLabel, IonChip } from "@ionic/react";
import styled from "styled-components";

import { IProductCategory } from "../../../../classes/productCategory/IProductCategory";

import { categories } from "../../../../resources/productCategories";
import { IProductDummy } from "../../../../classes/product/IProductDummy";
import { categoryColours } from "../../../../resources/config";

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
    <Row>
      {categories.map((category, i) => (
        <IonChipStyled
          key={i}
          outline={!!(data.category && category.type === data.category.type)}
          color={categoryValid ? categoryColours[category.type] : "danger"}
          onClick={() => onCategorySelect(category)}
        >
          <IonLabelStyled color={categoryColours[category.type]}>
            {t(category.nameKey)}
          </IonLabelStyled>
        </IonChipStyled>
      ))}
    </Row>
  );
};

const IonChipStyled = styled(IonChip)`
  color: ${({ color }) => color};
`;

const IonLabelStyled = styled(IonLabel)`
  color: ${({ color }) => color};
`;

const Row = styled.div`
  margin-bottom: 18px;
`;
