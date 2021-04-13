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
      onIonChange={handleSearch}
      placeholder={t("page.products.search.placeholder")}
    />
  );
};

const Search = styled(IonSearchbar)`
  // --background: rgba(255,255,255,0.25);
  --icon-color: var(--ion-color-tertiary);
  // --color: white;
  --border-radius: 25px;
  --padding: 0;
`;
