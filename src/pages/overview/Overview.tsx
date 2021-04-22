import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import moment from "moment";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IChartProductCategory } from "../../classes/productCategory/IChartProductCategory";
import { IProduct } from "../../classes/product/IProduct";
import { IMeal } from "../../classes/meal/IMeal";
import { MealsStorageService } from "../../services/MealsStorageService";
import { CalculationService } from "../../services/CalculationService";
import { MealCarbsLinearChart } from "./MealCarbsLinearChart";
import { CategoriesPieChart } from "./CategoriesPieChart";

export type Range = "7_days" | "30_days" | "90_days";

interface CardData {
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

export const Overview: React.FC = () => {
  const { t } = useTranslation();
  const calculation = new CalculationService();
  const mealsStorageService = new MealsStorageService();

  const [cardData, setCardData] = useState<CardData>(defaultCardDataState);

  useEffect(() => {
    getCardRangeData("7_days");
  }, []);

  const getCardRangeData = async (range: Range) => {
    let rangeMeals: IMeal[] = [];
    let products: IProduct[] = [];
    const today = new Date();

    switch (range) {
      case "7_days":
        const ago7Days = moment(today).subtract(7, "day").toDate();
        rangeMeals = await mealsStorageService.getAllForRange(ago7Days, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        setCardData({
          from: ago7Days,
          to: today,
          range,
          meals: rangeMeals,
          categories: calculation.getPieChartData(products),
        });
        break;

      case "30_days":
        const ago30Days = moment(today).subtract(30, "day").toDate();
        rangeMeals = await mealsStorageService.getAllForRange(ago30Days, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        setCardData({
          from: ago30Days,
          to: today,
          range,
          meals: rangeMeals,
          categories: calculation.getPieChartData(products),
        });
        break;

      case "90_days":
        const ago90Days = moment(today).subtract(90, "day").toDate();
        rangeMeals = await mealsStorageService.getAllForRange(ago90Days, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        setCardData({
          from: ago90Days,
          to: today,
          range,
          meals: rangeMeals,
          categories: calculation.getPieChartData(products),
        });
        break;
    }
  };

  const getPreviousRange = () => {
    switch (cardData.range) {
      case "7_days":
        getCardRangeData("30_days");
        break;

      case "30_days":
        getCardRangeData("90_days");
        break;

      default:
        return false;
    }
  };

  const getNextRange = () => {
    switch (cardData.range) {
      case "30_days":
        getCardRangeData("7_days");
        break;

      case "90_days":
        getCardRangeData("30_days");
        break;

      default:
        return false;
    }
  };
  return (
    <IonPage>
      <IonHeader mode="ios" translucent>
        <RangeSwitch>
          <IonButton
            color={cardData.range === "90_days" ? "light" : "medium"}
            fill="clear"
            shape="round"
            onClick={getPreviousRange}
          >
            <IonIcon icon={chevronBackOutline} />
          </IonButton>
          <IonTitle color="medium">
            {t("page.overview.carbs.range.card.title", {
              days: cardData.range.split("_")[0],
            })}
          </IonTitle>
          <IonButton
            color={cardData.range === "7_days" ? "light" : "medium"}
            fill="clear"
            shape="round"
            onClick={getNextRange}
          >
            <IonIcon icon={chevronForwardOutline} />
          </IonButton>
        </RangeSwitch>
      </IonHeader>
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

const CardHeader = styled(IonCardHeader)`
  display: flex;
  justify-content: space-between;
`;

const CardSubtitle = styled(IonCardSubtitle)`
  padding-left: 4px;
`;

const RangeSwitch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
