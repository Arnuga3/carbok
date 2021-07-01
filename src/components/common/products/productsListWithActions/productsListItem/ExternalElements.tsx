import React from "react";
import { useDispatch } from "react-redux";
import { ProductModal } from "../../../ProductModal";
import { CalculatorModal } from "../../../CalculatorModal";
import { useListProduct } from "../../../../../hooks/listProductHook";
import { closeProduct } from "../../../../../redux/actions/products/listProductActions";
import { IonAlert } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { deleteProduct } from "../../../../../redux/actions/products/productActions";

export const ExternalElements: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedListProduct, showModalOpen, calcModalOpen, deleteAlertOpen } =
    useListProduct();

  const handleClose = () => {
    dispatch(closeProduct());
  };

  return (
    <>
      <ProductModal
        product={selectedListProduct}
        open={showModalOpen}
        onClose={handleClose}
      />
      <CalculatorModal
        product={selectedListProduct}
        open={calcModalOpen}
        onClose={handleClose}
      />
      <IonAlert
        isOpen={deleteAlertOpen}
        onDidDismiss={handleClose}
        header={t("page.products.edit.product.delete.alert.title")}
        subHeader={t("page.products.edit.product.delete.alert.subtitle")}
        buttons={[
          { text: t("button.cancel"), role: "cancel" },
          {
            text: t("button.delete"),
            role: "destructive",
            handler: selectedListProduct
              ? () => dispatch(deleteProduct(selectedListProduct.id))
              : () => {},
          },
        ]}
      />
    </>
  );
};
