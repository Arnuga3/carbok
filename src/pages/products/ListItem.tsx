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
import { ProductListItem } from "../../components/common/ProductListItem";
import { addProduct } from "../../redux/actions/products/actions";
import { CircleBadge } from "../../components/common/CircleBadge";
import { categoryColours } from "../../resources/config";
import { getCatKey } from "../../resources/productCategories";
import { CircleBadgeMultiColor } from "../../components/common/CircleBadgeMultiColor";
import { getCategoriesColours, toggleActionsSlide } from "./util";
import { Product } from "../../classes/product/Product";

const PRODUCTSPAGE = "products-page";

interface Props {
  index: number;
  product: Product;
  onView: (product: Product) => void;
  onCalculate: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ListItem: React.FC<Props> = ({
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
    <IonItemSliding
      key={index}
      id={PRODUCTSPAGE + index}
      onClick={() => toggleActionsSlide(PRODUCTSPAGE + index)}
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
        <ProductListItem product={product} />
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
          <SlidingAction color="danger" onClick={() => onDelete(product)}>
            <IonIcon icon={trashOutline} slot="icon-only" />
          </SlidingAction>
        )}
        {!product.standard && (
          <SlidingAction
            color="secondary"
            routerLink={`/products/edit-product/${product.id}`}
          >
            <IonIcon icon={createOutline} slot="icon-only" />
          </SlidingAction>
        )}
        {product.standard && (
          <SlidingAction color="secondary" onClick={() => handleCopy(product)}>
            <IonIcon icon={copyOutline} slot="icon-only" />
          </SlidingAction>
        )}
        <SlidingAction color="primary" onClick={() => onView(product)}>
          <IonIcon icon={eyeOutline} slot="icon-only" />
        </SlidingAction>
        <SlidingAction
          color="tertiary"
          onClick={() => onCalculate(product)}
        >
          <IonIcon icon={calculator} slot="icon-only" />
        </SlidingAction>
      </ItemOptions>
    </IonItemSliding>
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
