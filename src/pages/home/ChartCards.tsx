import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import moment from "moment";
import styled from "styled-components";
import { IChartProductCategory } from "../../classes/productCategory/IChartProductCategory";
import { IProduct } from "../../classes/product/IProduct";
import { IMeal } from "../../classes/meal/IMeal";
import { MealsStorageService } from "../../services/MealsStorageService";
import { CalculationService } from "../../services/CalculationService";
import { MealCarbsLinearChart } from "./MealCarbsLinearChart";
import { CategoriesPieChart } from "./CategoriesPieChart";

export type Range = "7_days" | "30_days";

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

export const ChartCards: React.FC = () => {
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
    }
  };
  return (
    <>
      <IonCard>
        <CardHeader>
          {cardData.from && cardData.to && (
            <IonCardTitle>
              {t("page.home.carbs.range.card.title", {
                days: cardData.range === "7_days" ? 7 : 30,
              })}
            </IonCardTitle>
          )}
          <IonCardSubtitle>{`${moment(cardData.from).format(
            "D MMM"
          )} - ${moment(cardData.to).format("D MMM")}`}</IonCardSubtitle>
        </CardHeader>
        <IonCardContent>
          <MealCarbsLinearChart meals={cardData.meals} />
        </IonCardContent>
      </IonCard>
      <IonCard>
        <CardHeader>
          {cardData.from && cardData.to && (
            <IonCardTitle>
              {t("page.home.carbs.range.card.title", {
                days: cardData.range === "7_days" ? 7 : 30,
              })}
            </IonCardTitle>
          )}
          <IonCardSubtitle>{`${moment(cardData.from).format(
            "D MMM"
          )} - ${moment(cardData.to).format("D MMM")}`}</IonCardSubtitle>
        </CardHeader>
        <IonCardContent>
          <CategoriesPieChart categories={cardData.categories} />
        </IonCardContent>
      </IonCard>
    </>
  );
};

const CardHeader = styled(IonCardHeader)`
  display: flex;
  justify-content: space-between;
`;
