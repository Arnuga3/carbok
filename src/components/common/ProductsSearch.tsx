import { useDispatch } from "react-redux";
import { IonSearchbar, useIonViewWillLeave } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { setSearchString } from "../../redux/actions/products/actions";
import styled from "styled-components";
import { useRef } from "react";
import _ from "lodash";

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
    dispatch(setSearchString(e.detail.value.toLowerCase()));
  };

  const searchThrottled = useRef(_.throttle(handleSearch, 1000));

  return (
    <Search
      mode="ios"
      ref={searchInput}
      clearIcon={closeCircleOutline}
      onIonChange={(e) => searchThrottled.current(e)}
      placeholder={t("page.products.search.placeholder")}
    />
  );
};

const Search = styled(IonSearchbar)`
  --icon-color: var(--ion-color-primary);
  --border-radius: 25px;
  border-radius: 4px;
  --padding: 0;
`;
