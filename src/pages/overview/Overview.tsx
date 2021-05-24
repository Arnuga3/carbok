import React, { useState } from "react";
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
} from "@ionic/react";
import { IChartProductCategory } from "../../classes/productCategory/IChartProductCategory";
import { IMeal } from "../../classes/meal/IMeal";
import { MealCarbsLinearChart } from "./MealCarbsLinearChart";
import { CategoriesPieChart } from "../../components/common/CategoriesPieChart";
import { DateRangeSwitch } from "./DateRangeSwitch";

export type Range = "7_days" | "30_days" | "90_days";

export interface CardData {
  range: Range;
  from: Date | null;
  to: Date | null;
  meals: IMeal[] | [];
  categories: IChartProductCategory[] | [];
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

  const handleDateRangeChange = (data: CardData) => {
    setCardData(data);
  };

  return (
    <IonPage>
      <DateRangeSwitch data={cardData} onDateRangeChange={handleDateRangeChange} />
      <IonContent fullscreen>
        {cardData.meals.length > 0 && (
          <>
            <IonCard>
              <CardHeader>
                <IonCardTitle>{t("carbohydrates")}</IonCardTitle>
                {cardData.from && cardData.to && (
                  <CardSubtitle>{`${moment(cardData.from).format(
                    "D MMM"
                  )} - ${moment(cardData.to).format("D MMM")}`}</CardSubtitle>
                )}
              </CardHeader>
              <IonCardContent>
                <MealCarbsLinearChart meals={cardData.meals} />
              </IonCardContent>
            </IonCard>
            <IonCard>
              <CardHeader>
                <IonCardTitle>
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
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Overview);

const CardHeader = styled(IonCardHeader)`
  display: flex;
  justify-content: space-between;
`;

const CardSubtitle = styled(IonCardSubtitle)`
  padding-left: 4px;
`;
