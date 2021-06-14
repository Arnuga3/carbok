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
import { IPieCategory } from "../../classes/productCategory/IPieCategory";
import { MealCarbsLinearChart } from "../../components/charts/MealCarbsLinearChart";
import { CategoriesPieChart } from "../../components/charts/CategoriesPieChart";
import { DateRangeSwitch } from "./DateRangeSwitch";
import { Meal } from "../../classes/meal/Meal";

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

  const handleDateRangeChange = (data: CardData) => {
    setCardData(data);
  };

  return (
    <IonPage>
      <DateRangeSwitch
        data={cardData}
        onDateRangeChange={handleDateRangeChange}
      />
      <IonContent>
        {cardData.meals.length > 0 && (
          <Wrapper>
            <Card color="primary">
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
            </Card>
            <Card color="tertiary">
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
            </Card>
          </Wrapper>
        )}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Overview);

const Wrapper = styled.div`
  margin-top: 75px;
`;

const Card = styled(IonCard)`
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.6);
`;

const CardHeader = styled(IonCardHeader)`
  display: flex;
  justify-content: space-between;
`;

const CardSubtitle = styled(IonCardSubtitle)`
  padding-left: 4px;
`;
