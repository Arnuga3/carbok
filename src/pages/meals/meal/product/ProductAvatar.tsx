import React from "react";
import { useTranslation } from "react-i18next";
import { CategoryAvatar } from "../../../../components/common/products/CategoryAvatar";
import { categoryColours } from "../../../../resources/config";
import { getCatKey } from "../../../../resources/productCategories";
import { getCategoriesColours } from "../../../products/util";
import { MealProduct } from "../../../../classes/meal/MealProduct";
import { IonAvatar, IonIcon } from "@ionic/react";
import { pencil } from "ionicons/icons";

interface Props {
  product: MealProduct;
}

export const ProductAvatar: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <IonAvatar slot="start">
      {product.dummy ? (
        <CategoryAvatar colors='rgba(0,0,0,0.1)' size={40}>
          <IonIcon icon={pencil} size="small"/>
        </CategoryAvatar>
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
