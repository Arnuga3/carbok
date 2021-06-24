import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  IonItem,
  IonIcon,
  IonItemOptions,
  IonItemSliding,
  IonItemOption,
  IonAvatar,
} from "@ionic/react";
import {
  calculator,
  copyOutline,
  createOutline,
  ellipsisVerticalOutline,
  eyeOutline,
  trashOutline,
} from "ionicons/icons";
import { ProductListItemLabel } from "./ProductListItemLabel";
import { addProduct } from "../../../redux/actions/products/actions";
import { CircleBadge } from "../CircleBadge";
import { categoryColours } from "../../../resources/config";
import { getCatKey } from "../../../resources/productCategories";
import { CircleBadgeMultiColor } from "../CircleBadgeMultiColor";
import { getCategoriesColours, toggleActionsSlide } from "../../../pages/products/util";
import { Product } from "../../../classes/product/Product";

interface Props {
  identifier: string;
  index: number;
  product: Product;
  onView: (product: Product) => void;
  onCalculate: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductListItem: React.FC<Props> = ({
  identifier,
  index,
  product,
  onView,
  onCalculate,
  onDelete,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleCopy = (product: Product) => {
    if (product) {
      const { name, categories, units, carbsData, portionType } = product;
      const productCopied = new Product(
        name,
        categories,
        units,
        carbsData,
        portionType,
        false
      );
      dispatch(addProduct(productCopied));
    }
  };

  return (
    <>
      {product ? (
        <IonItemSliding
          key={index}
          id={identifier + index}
          onClick={() => toggleActionsSlide(identifier + index)}
        >
          <Item lines="none">
            <IonAvatar slot="start">
              {product.categories.length === 1 && (
                <CircleBadge
                  color={categoryColours[product.categories[0]]}
                  size={40}
                  standard={product.standard}
                >
                  {t(getCatKey(product.categories[0])).slice(0, 3)}
                </CircleBadge>
              )}
              {product.categories.length > 1 && (
                <CircleBadgeMultiColor
                  colors={getCategoriesColours(product.categories)}
                  size={40}
                >
                  {t(getCatKey("mix"))}
                </CircleBadgeMultiColor>
              )}
            </IonAvatar>
            <ProductListItemLabel product={product} />
            <IonIcon
              size="small"
              color="medium"
              style={{ marginLeft: 8 }}
              icon={ellipsisVerticalOutline}
              slot="end"
            />
          </Item>
          <ItemOptions>
            {!product.standard && (
              <SlidingAction color="light" onClick={() => onDelete(product)}>
                <IonIcon icon={trashOutline} slot="icon-only" color="primary" />
              </SlidingAction>
            )}
            {!product.standard && (
              <SlidingAction
                color="light"
                routerLink={`/products/edit-product/${product.id}`}
              >
                <IonIcon icon={createOutline} slot="icon-only" color="primary" />
              </SlidingAction>
            )}
            {product.standard && (
              <SlidingAction
                color="light"
                onClick={() => handleCopy(product)}
              >
                <IonIcon icon={copyOutline} slot="icon-only" color="primary" />
              </SlidingAction>
            )}
            <SlidingAction color="light" onClick={() => onView(product)}>
              <IonIcon icon={eyeOutline} slot="icon-only" color="primary" />
            </SlidingAction>
            <SlidingAction
              color="light"
              onClick={() => onCalculate(product)}
            >
              <IonIcon icon={calculator} slot="icon-only" color="primary" />
            </SlidingAction>
          </ItemOptions>
        </IonItemSliding>
      ) : null}
    </>
  );
};

const Item = styled(IonItem)`
  --min-height: 70px;
  margin: 4px;
  border-radius: 12px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
`;

const ItemOptions = styled(IonItemOptions)`
  dispay: flex;
  align-items: center;
`;

const SlidingAction = styled(IonItemOption)`
  width: 55px;
  height: 55px;
  margin: 4px;
  border-radius: 100%;
`;
