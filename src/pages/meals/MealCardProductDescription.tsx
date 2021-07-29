import React from "react";
import styled from "styled-components";

import { IMeal } from "../../classes/meal/IMeal";
import { IMealProduct } from "../../classes/meal/IMealProduct";
import { MealProduct } from "../../classes/meal/MealProduct";
import { getUnitShortKey } from "../../resources/productUnits";

interface Props {
  product: IMealProduct;
  meal: IMeal;
  t: any;
  i: number;
}

function getPerQuantityData(product: MealProduct) {
  return {
    portion: `${product.mealProductCarbs.perPortion.quantity} ${
      product.mealProductCarbs.perPortion.description ?? ""
    }`,
    carbs: product.mealProductCarbs.perPortion.carbs,
  };
}

function getPerWeightData(product: MealProduct, t: any) {
  return {
    portion: `${product.mealProductCarbs.per100.portion}${t(
      getUnitShortKey(product.units)
    )}`,
    carbs: product.mealProductCarbs.per100.carbs,
  };
}

export const MealCardProductDescription: React.FC<Props> = ({
  product,
  t,
  i,
  meal,
}) => {
  const data =
    product.portionTypeInUse === "quantity"
      ? getPerQuantityData(product)
      : getPerWeightData(product, t);
  return (
    <ProductItem>{`
      ${product.name},
      ${product.dummy ? '' : data.portion}
      (${data.carbs} ${t("carbohydrates.short")})${
      i !== meal.products.length - 1 ? "," : ""
    }
    `}</ProductItem>
  );
};

const ProductItem = styled.p`
  font-style: italic;
  padding-left: 8px;
  color: var(--ion-color-beige);
`;
