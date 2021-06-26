import React, { useState } from "react";
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
  IonAlert,
} from "@ionic/react";
import {
  calculator,
  copyOutline,
  createOutline,
  ellipsisVerticalOutline,
  eyeOutline,
  trashOutline,
} from "ionicons/icons";
import { ProductsListItemLabel } from "../ProductsListItemLabel";
import {
  addProduct,
  deleteProduct,
} from "../../../../redux/actions/products/actions";
import { CircleBadge } from "../../CircleBadge";
import { categoryColours } from "../../../../resources/config";
import { getCatKey } from "../../../../resources/productCategories";
import { CircleBadgeMultiColor } from "../../CircleBadgeMultiColor";
import {
  getCategoriesColours,
  toggleActionsSlide,
} from "../../../../pages/products/util";
import { Product } from "../../../../classes/product/Product";
import { ProductModal } from "../../ProductModal";
import { CalculatorModal } from "../../CalculatorModal";

interface Props {
  identifier: string;
  index: number;
  product: Product;
}

export const ProductsListItem: React.FC<Props> = ({
  identifier,
  index,
  product,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [state, setState] = useState<{
    productSelected: Product | null;
    openDeleteAlert: boolean;
    openProductModal: boolean;
    openCalculatorModal: boolean;
  }>({
    productSelected: null,
    openDeleteAlert: false,
    openProductModal: false,
    openCalculatorModal: false,
  });

  const {
    productSelected,
    openDeleteAlert,
    openProductModal,
    openCalculatorModal,
  } = state;

  const handleOnView = (product: Product) => {
    setState({
      ...state,
      productSelected: product,
      openProductModal: true,
    });
  };

  const handleOnClose = () => {
    setState({
      ...state,
      productSelected: null,
      openCalculatorModal: false,
      openProductModal: false,
    });
  };

  const handleOnCalculate = (product: Product) => {
    setState({
      ...state,
      productSelected: product,
      openCalculatorModal: true,
    });
  };

  const handleOnDelete = (product: Product) => {
    setState({
      ...state,
      productSelected: product,
      openDeleteAlert: true,
    });
  };

  const handleDelete = () => {
    if (productSelected) {
      dispatch(deleteProduct(productSelected.id));
      setState({
        ...state,
        productSelected: null,
      });
    }
  };

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
        <>
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
              <ProductsListItemLabel product={product} />
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
                <SlidingAction
                  color="light"
                  onClick={() => handleOnDelete(product)}
                >
                  <IonIcon
                    icon={trashOutline}
                    slot="icon-only"
                    color="primary"
                  />
                </SlidingAction>
              )}
              {!product.standard && (
                <SlidingAction
                  color="light"
                  routerLink={`/products/edit-product/${product.id}`}
                >
                  <IonIcon
                    icon={createOutline}
                    slot="icon-only"
                    color="primary"
                  />
                </SlidingAction>
              )}
              {product.standard && (
                <SlidingAction
                  color="light"
                  onClick={() => handleCopy(product)}
                >
                  <IonIcon
                    icon={copyOutline}
                    slot="icon-only"
                    color="primary"
                  />
                </SlidingAction>
              )}
              <SlidingAction
                color="light"
                onClick={() => handleOnView(product)}
              >
                <IonIcon icon={eyeOutline} slot="icon-only" color="primary" />
              </SlidingAction>
              <SlidingAction
                color="light"
                onClick={() => handleOnCalculate(product)}
              >
                <IonIcon icon={calculator} slot="icon-only" color="primary" />
              </SlidingAction>
            </ItemOptions>
          </IonItemSliding>

          <IonAlert
            isOpen={openDeleteAlert}
            onDidDismiss={() => setState({ ...state, openDeleteAlert: false })}
            header={t("page.products.edit.product.delete.alert.title")}
            subHeader={t("page.products.edit.product.delete.alert.subtitle")}
            buttons={[
              { text: t("button.cancel"), role: "cancel" },
              {
                text: t("button.delete"),
                role: "destructive",
                handler: handleDelete,
              },
            ]}
          />
          <ProductModal
            product={productSelected}
            open={openProductModal}
            onClose={handleOnClose}
          />
          <CalculatorModal
            product={productSelected}
            open={openCalculatorModal}
            onClose={handleOnClose}
          />
        </>
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
