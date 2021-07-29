import React from "react";
import { useTranslation } from "react-i18next";
import { CategoryAvatar } from "../../../components/common/products/CategoryAvatar";
import { categoryColours } from "../../../resources/config";
import { getCatKey } from "../../../resources/productCategories";
import { getCategoriesColours } from "../../products/util";
import { MealProduct } from "../../../classes/meal/MealProduct";
import { IonAvatar } from "@ionic/react";
import Products from "../../products/Products";

interface Props {
  product: MealProduct;
}

export const ProductAvatar: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <IonAvatar slot="start">
      {product.dummy ? (
        <CategoryAvatar colors='lightgrey' size={40} />
      ) : (
        <>
          {product.categories.length === 1 && (
            <CategoryAvatar
              colors={categoryColours[product.categories[0]]}
              size={40}
            >
              {t(getCatKey(product.categories[0])).slice(0, 3)}
            </CategoryAvatar>
          )}
          {product.categories.length > 1 && (
            <CategoryAvatar
              colors={getCategoriesColours(product.categories)}
              size={40}
            >
              {`+ ${product.categories.length}`}
            </CategoryAvatar>
          )}
        </>
      )}
    </IonAvatar>
  );
};
