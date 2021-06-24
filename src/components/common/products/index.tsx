import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IonContent, IonAlert } from "@ionic/react";
import { Product } from "../../../classes/product/Product";
import { deleteProduct } from "../../../redux/actions/products/actions";
import { ProductsList } from "./ProductsList";
import { CalculatorModal } from "../CalculatorModal";
import { ProductModal } from "../ProductModal";

interface Props {
  products: Product[];
  identifier: string;
}

export const ProductsWithState: React.FC<Props> = ({ products, identifier }) => {
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

  const handleOnClose = () => {
    setState({
      ...state,
      productSelected: null,
      openCalculatorModal: false,
      openProductModal: false,
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

  const ItemsList = useMemo(() => {
    return (
      <ProductsList
        identifier={identifier}
        productsFiltered={products}
        onView={(product: Product) =>
          setState({
            ...state,
            productSelected: product,
            openProductModal: true,
          })
        }
        onCalculate={(product: Product) =>
          setState({
            ...state,
            productSelected: product,
            openCalculatorModal: true,
          })
        }
        onDelete={(product: Product) =>
          setState({
            ...state,
            productSelected: product,
            openDeleteAlert: true,
          })
        }
      />
    );
  }, [products]);

  return (
    <>
      <IonContent>{products && ItemsList}</IonContent>
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
  );
};
