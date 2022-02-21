import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import styled from "styled-components";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonText,
} from "@ionic/react";
import { IPieCategory } from "../../classes/productCategory/IPieCategory";
import { MealCarbsLinearChart } from "../../components/charts/MealCarbsLinearChart";
import { CategoriesPieChart } from "../../components/charts/CategoriesPieChart";
import { DateRangeSwitch } from "./DateRangeSwitch";
import { Meal } from "../../classes/meal/Meal";
import _ from "lodash";
import { changeBorderStyle } from "../../utils/eventHelpers";

import BackgroundImage1 from "../../resources/images/spaghetti.jpg";

export type Range = "7_days" | "30_days" | "90_days";

export interface CardData {
  range: Range;
  from: Date | null;
  to: Date | null;
  meals: Meal[] | [];
  categories: IPieCategory[] | [];
}

const defaultCardDataState: CardData = {
  range: "7_days",
  from: null,
  to: null,
  meals: [],
  categories: [],
};

const Overview: React.FC = () => {
  const { t } = useTranslation();
  const [cardData, setCardData] = useState<CardData>(defaultCardDataState);

  const listRef = useRef<HTMLDivElement>(null);
  const changeBorderStyleThrottled = useRef(
    _.throttle((e) => changeBorderStyle(e, listRef.current), 500)
  );

  const handleDateRangeChange = (data: CardData) => {
    setCardData(data);
  };

  return (
    <IonPage>
      <DateRangeSwitch
        data={cardData}
        onDateRangeChange={handleDateRangeChange}
      />
      <ListWrapper ref={listRef}>
        <IonContent
          scrollEvents
          onIonScroll={(e) => changeBorderStyleThrottled.current(e)}
        >
          {cardData.meals.length > 0 ? (
            <>
              <CarbsCard>
                <CardHeader>
                  <IonCardTitle color="tertiary">{t("carbohydrates")}</IonCardTitle>
                  {cardData.from && cardData.to && (
                    <CardSubtitle>{`${moment(cardData.from).format(
                      "D MMM"
                    )} - ${moment(cardData.to).format("D MMM")}`}</CardSubtitle>
                  )}
                </CardHeader>
                <IonCardContent>
                  <MealCarbsLinearChart meals={cardData.meals} />
                </IonCardContent>
              </CarbsCard>
              <ProductsCard color="">
                <CardHeader>
                  <IonCardTitle color="tertiary">
                    {t("page.overview.foods.range.card.title")}
                  </IonCardTitle>
                  {cardData.from && cardData.to && (
                    <IonCardSubtitle>{`${moment(cardData.from).format(
                      "D MMM"
                    )} - ${moment(cardData.to).format(
                      "D MMM"
                    )}`}</IonCardSubtitle>
                  )}
                </CardHeader>
                <IonCardContent>
                  <CategoriesPieChart categories={cardData.categories} />
                </IonCardContent>
              </ProductsCard>
            </>
          ) : (
            <NoDataText color="medium">
              <p>{t("not.enough.data")}</p>
            </NoDataText>
          )}
        </IonContent>
      </ListWrapper>
    </IonPage>
  );
};

export default React.memo(Overview);

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CarbsCard = styled(IonCard)`
  margin-top: 20px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const ProductsCard = styled(IonCard)`
  margin-top: 20px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const CardHeader = styled(IonCardHeader)`
  display: flex;
  justify-content: space-between;
`;

const CardSubtitle = styled(IonCardSubtitle)`
  padding-left: 4px;
`;

const NoDataText = styled(IonText)`
  text-align: center;
  padding: 12px;
`;
