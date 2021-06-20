import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import styled from "styled-components";
import {
  IonButton,
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
import { CalculatorModal } from "../../components/common/CalculatorModal";

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
  const [openCalculatorModal, setOpenCalculatorModal] = useState(false);

  const handleDateRangeChange = (data: CardData) => {
    setCardData(data);
  };

  return (
    <IonPage>
      <IonContent>
        <DateRangeSwitch
          data={cardData}
          onDateRangeChange={handleDateRangeChange}
        />
        {cardData.meals.length > 0 && (
          <>
            <Card color="violet">
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
            <Card color="blue">
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
          </>
        )}
        <Card color="green">
          <CardHeader>
            <IonCardTitle>
              {t("page.overview.calculator.card.title")}
            </IonCardTitle>
          </CardHeader>
          <CalculatorCardContent>
            <CalculateButton onClick={() => setOpenCalculatorModal(true)} color="secondary">
              {t("button.calculate")}
            </CalculateButton>
          </CalculatorCardContent>
        </Card>
        <CalculatorModal
          open={openCalculatorModal}
          onClose={() => setOpenCalculatorModal(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Overview);

const Card = styled(IonCard)`
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.6);
`;

const CardHeader = styled(IonCardHeader)`
  display: flex;
  justify-content: space-between;
`;

const CalculatorCardContent = styled(IonCardContent)`
  text-align: center;
`;

const CalculateButton = styled(IonButton)`
  --border-radius: 32px;
`;

const CardSubtitle = styled(IonCardSubtitle)`
  padding-left: 4px;
`;
