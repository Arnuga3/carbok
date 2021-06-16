import React from "react";
import { useTranslation } from "react-i18next";
import { IonLabel, IonChip } from "@ionic/react";
import styled from "styled-components";

import { categories, getCatKey } from "../../../../resources/productCategories";
import { IProductDummy } from "../../../../classes/product/IProductDummy";
import { categoryColours } from "../../../../resources/config";
import { ProductCategoryType } from "../../../../classes/productCategory/ProductCategoryType";

function getCategoryColor(
  isValid: boolean,
  productCategories: ProductCategoryType[],
  category: ProductCategoryType
) {
  if (!isValid) {
    return "danger";
  }
  if (!!(productCategories && productCategories.includes(category))) {
    return categoryColours[category];
  }
  return "medium";
}

function getLabelColor(
  productCategories: ProductCategoryType[],
  category: ProductCategoryType
) {
  if (!!(productCategories && productCategories.includes(category))) {
    return "light";
  }
  return categoryColours[category];
}

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
        <Chip
          key={i}
          color={getCategoryColor(categoryValid, data.categories, category)}
          onClick={() => onCategorySelect(category)}
        >
          <Label color={getLabelColor(data.categories, category)}>
            {t(getCatKey(category))}
          </Label>
        </Chip>
      ))}
    </Row>
  );
};

const Chip = styled(IonChip)`
  background: ${({ color }) => color};
  color: ${({ color }) => color};
`;

const Label = styled(IonLabel)`
  color: ${({ color }) => color};
`;

const Row = styled.div`
  margin-bottom: 18px;
`;
