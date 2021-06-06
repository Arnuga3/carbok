import { useDispatch } from "react-redux";
import { IonSearchbar, useIonViewWillLeave } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { setSearchString } from "../../redux/actions/products/actions";
import styled from "styled-components";
import { useRef } from "react";

let delayTimer: any;

export const ProductsSearch: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const searchInput = useRef<HTMLIonSearchbarElement>(null);

  useIonViewWillLeave(() => {
    if (searchInput && searchInput.current) {
      searchInput.current.value = "";
    }
  });

  const handleSearch = (e: any) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      dispatch(setSearchString(e.detail.value.toLowerCase()));
    }, 500);
  };

  return (
    <Search
      ref={searchInput}
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
