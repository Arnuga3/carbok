import { IonSearchbar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IProduct } from "../../classes/product/IProduct";

interface Props {
    products: IProduct[];
    onSearchComplete: any;
}

export const ProductsSearch: React.FC<Props> = ({ products, onSearchComplete }) => {
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
        <Search animated onIonChange={handleSearch} placeholder={t("page.products.search.placeholder")}></Search>
    );
};

const Search = styled(IonSearchbar)`
  --border-radius: 25px;
  width: 100%;
  padding-bottom: 12px;
`;