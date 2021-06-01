import React from "react";
import { useTranslation } from "react-i18next";
import { IonLabel, IonChip } from "@ionic/react";
import styled from "styled-components";

import { categories, getCatKey } from "../../../../resources/productCategories";
import { IProductDummy } from "../../../../classes/product/IProductDummy";
import { categoryColours } from "../../../../resources/config";
import { ProductCategoryType } from "../../../../classes/productCategory/ProductCategoryType";

interface Props {
  data: IProductDummy;
  categoryValid: boolean;
  onCategoryToggle: (category: ProductCategoryType) => void;
}

export const Category: React.FC<Props> = ({
  data,
  categoryValid,
  onCategoryToggle: onCategorySelect,
}) => {
  const { t } = useTranslation();
  return (
    <Row>
      {categories.map((category: ProductCategoryType, i) => (
        <IonChipStyled
          key={i}
          outline={!!(data.categories && data.categories.includes(category))}
          color={categoryValid ? categoryColours[category] : "danger"}
          onClick={() => onCategorySelect(category)}
        >
          <IonLabelStyled color={categoryColours[category]}>
            {t(getCatKey(category))}
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
