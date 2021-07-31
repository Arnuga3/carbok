import React from "react";
import styled from "styled-components";
import { IonItem, IonItemOptions, IonItemSliding, IonList } from "@ionic/react";
import { MealProductListItem } from "../../../components/common/MealProductListItem";
import { Meal } from "../../../classes/meal/Meal";
import { toggleActionsSlide } from "../../../utils/eventHelpers";
import { ProductAvatar } from "./product/ProductAvatar";
import { DeleteSlidingAction } from "./product/slidingActions/DeleteSlidingAction";
import { PortionSizeSlidingAction } from "./product/slidingActions/PortionSizeSlidingAction";
import { PortionQuantitySlidingAction } from "./product/slidingActions/PortionQuantitySlidingAction";

interface Props {
  meal: Meal;
}
const MEALSPAGE = "meals-page";

export const ProductList: React.FC<Props> = ({ meal }) => {
  return (
    <List>
      {meal.products.map((product, i) => (
        <IonItemSliding
          key={i}
          id={MEALSPAGE + i}
          onClick={() => toggleActionsSlide(MEALSPAGE + i)}
        >
          <Item detail lines="none">
            <ProductAvatar product={product} />
            <MealProductListItem product={product} />
          </Item>
          <ItemSlidingActions>
            {product.dummy ? (
              <>
                <DeleteSlidingAction meal={meal} product={product} />
              </>
            ) : (
              <>
                {product.portionType === "quantity" && (
                  <PortionQuantitySlidingAction meal={meal} product={product} />
                )}
                <PortionSizeSlidingAction meal={meal} product={product} />
                <DeleteSlidingAction meal={meal} product={product} />
              </>
            )}
          </ItemSlidingActions>
        </IonItemSliding>
      ))}
    </List>
  );
};

const List = styled(IonList)`
  min-height: 100%;
  padding-top: 28px;
  padding-bottom: 65px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
`;

const ItemSlidingActions = styled(IonItemOptions)`
  dispay: flex;
  align-items: center;
`;

const Item = styled(IonItem)`
  --min-height: 70px;
  margin: 4px;
  border-radius: 12px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
`;
