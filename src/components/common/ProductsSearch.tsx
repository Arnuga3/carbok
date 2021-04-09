import { IonSearchbar } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";

interface Props {
  products: IProduct[];
  onSearchComplete: any;
}

export const ProductsSearch: React.FC<Props> = ({
  products,
  onSearchComplete,
}) => {
  const { t } = useTranslation();
  const handleSearch = (e: any) => {
    onSearchComplete(
      products.filter(
        (product: IProduct) =>
          product.name.toLowerCase().indexOf(e.detail.value.toLowerCase()) > -1
      )
    );
  };
  return (
    <Search
      clearIcon={closeCircleOutline}
      animated
      onIonChange={handleSearch}
      placeholder={t("page.products.search.placeholder")}
    />
  );
};

const Search = styled(IonSearchbar)`
  --border-radius: 25px;
  width: 100%;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
`;
