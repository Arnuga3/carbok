import React from "react";
import styled from "styled-components";

import { IMeal } from "../../classes/meal/IMeal";
import { IMealProduct } from "../../classes/meal/IMealProduct";
import { getUnitShortKey } from "../../resources/productUnits";

interface Props {
  product: IMealProduct;
  meal: IMeal;
  t: any;
  i: number;
}

export const DayMealCardProduct: React.FC<Props> = ({
  product,
  t,
  i,
  meal,
}) => {
  const data =
    product.portionTypeInUse === "quantity"
      ? {
          portion: `${product.mealProductCarbs.perPortion.quantity} ${product.mealProductCarbs.perPortion.description}`,
          carbs: product.mealProductCarbs.perPortion.carbs,
        }
      : {
          portion: `${product.mealProductCarbs.per100.portion}${t(
            getUnitShortKey(product.units.type)
          )}`,
          carbs: product.mealProductCarbs.per100.carbs,
        };
  return (
    <ProductItem>{`
      ${product.name}
      ${data.portion}
      (${data.carbs} ${t("carbohydrates.short")})${
      i !== meal.products.length - 1 ? "," : ""
    }
    `}</ProductItem>
  );
};

const ProductItem = styled.p`
  font-style: italic;
  padding-left: 8px;
`;
