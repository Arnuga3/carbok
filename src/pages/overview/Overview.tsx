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
      <DateRangeSwitch
        data={cardData}
        onDateRangeChange={handleDateRangeChange}
      />
      <IonContent>
        {cardData.meals.length > 0 && (
          <>
            <CarbsCard>
              <CardHeader>
                <IonCardTitle>{t("carbohydrates")}</IonCardTitle>
                {cardData.from && cardData.to && (
                  <CardSubtitle color="light">{`${moment(cardData.from).format(
                    "D MMM"
                  )} - ${moment(cardData.to).format("D MMM")}`}</CardSubtitle>
                )}
              </CardHeader>
              <IonCardContent>
                <MealCarbsLinearChart meals={cardData.meals} />
              </IonCardContent>
            </CarbsCard>
            <ProductsCard>
              <CardHeader>
                <IonCardTitle>
                  {t("page.overview.foods.range.card.title")}
                </IonCardTitle>
                {cardData.from && cardData.to && (
                  <IonCardSubtitle color="light">{`${moment(
                    cardData.from
                  ).format("D MMM")} - ${moment(cardData.to).format(
                    "D MMM"
                  )}`}</IonCardSubtitle>
                )}
              </CardHeader>
              <IonCardContent>
                <CategoriesPieChart categories={cardData.categories} />
              </IonCardContent>
            </ProductsCard>
          </>
        )}
        <Card>
          <CardHeader>
            <IonCardTitle>
              {t("page.overview.calculator.card.title")}
            </IonCardTitle>
          </CardHeader>
          <CalculatorCardContent>
            <CalculateButton
              onClick={() => setOpenCalculatorModal(true)}
              color="light"
            >
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

const CarbsCard = styled(IonCard)`
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6);
  background-color: #00DBDE;
  background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);
  

`;

const ProductsCard = styled(IonCard)`
  border-radius: 20px;
  margin-top: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6);
  background-color: #4158D0;
background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);


`;

const Card = styled(IonCard)`
  border-radius: 20px;
  margin-top: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6);
  background-image: linear-gradient( 109.6deg,  rgba(62,161,219,1) 11.2%, rgba(93,52,236,1) 100.2% );
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
