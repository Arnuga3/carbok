import { useDispatch } from "react-redux";
import { IonSearchbar } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { setSearchString } from "../../redux/actions/products/actions";
import styled from "styled-components";

export const ProductsSearch: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const handleSearch = (e: any) => {
    dispatch(setSearchString(e.detail.value.toLowerCase()));
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
  --icon-color: var(--ion-color-primary);
  --border-radius: 25px;
  --padding: 0;
`;
