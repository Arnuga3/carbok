import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IonChip, useIonViewWillEnter } from "@ionic/react";
import { CardData } from "./Overview";
import { Range } from "./Overview";
import { dataService } from "../../services/DataService";
import { Meal } from "../../classes/meal/Meal";
import { MealProduct } from "../../classes/meal/MealProduct";
import { chartsDataService } from "../../services/ChartsDataService";
import { dateService } from "../../services/DateService";
import { Toolbar } from "../../components/styled/Toolbar";

interface Props {
  data: CardData;
  onDateRangeChange: (data: CardData) => void;
}

export const DateRangeSwitch: React.FC<Props> = ({
  data,
  onDateRangeChange,
}) => {
  const { t } = useTranslation();

  useIonViewWillEnter(() => {
    getCardRangeData(data.range);
  });

  const getCardRangeData = async (range: Range) => {
    let rangeMeals: Meal[] = [];
    let products: MealProduct[] = [];
    const today = dateService.todayNoTime();

    switch (range) {
      case "7_days":
        const day7Ago = dateService.day7AgoNoTime();
        rangeMeals = await dataService.retrieveMealsBetween(day7Ago, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        onDateRangeChange({
          from: new Date(day7Ago.setDate(day7Ago.getDate() + 1)),
          to: new Date(today.setDate(today.getDate() - 1)),
          range,
          meals: rangeMeals,
          categories: chartsDataService.getPieCategoriesData(products),
        });
        break;

      case "30_days":
        const day30Ago = dateService.day30AgoNoTime();
        rangeMeals = await dataService.retrieveMealsBetween(day30Ago, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        onDateRangeChange({
          from: new Date(day30Ago.setDate(day30Ago.getDate() + 1)),
          to: new Date(today.setDate(today.getDate() - 1)),
          range,
          meals: rangeMeals,
          categories: chartsDataService.getPieCategoriesData(products),
        });
        break;

      case "90_days":
        const day90Ago = dateService.day90AgoNoTime();
        rangeMeals = await dataService.retrieveMealsBetween(day90Ago, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        onDateRangeChange({
          from: new Date(day90Ago.setDate(day90Ago.getDate() + 1)),
          to: new Date(today.setDate(today.getDate() - 1)),
          range,
          meals: rangeMeals,
          categories: chartsDataService.getPieCategoriesData(products),
        });
        break;
    }
  };

  return (
    <Toolbar>
      <RangeSwitch>
        <Chip
          onClick={() => getCardRangeData("90_days")}
          color={
            data.range === "90_days"
              ? "var(--ion-color-secondary)"
              : "var(--ion-color-light-darker)"
          }
        >
          {t("page.overview.carbs.range.card.title", { days: 90 })}
        </Chip>
        <Chip
          onClick={() => getCardRangeData("30_days")}
          color={
            data.range === "30_days"
              ? "var(--ion-color-secondary)"
              : "var(--ion-color-light-darker)"
          }
        >
          {t("page.overview.carbs.range.card.title", { days: 30 })}
        </Chip>
        <Chip
          onClick={() => getCardRangeData("7_days")}
          color={
            data.range === "7_days"
              ? "var(--ion-color-secondary)"
              : "var(--ion-color-light-darker)"
          }
        >
          {t("page.overview.carbs.range.card.title", { days: 7 })}
        </Chip>
      </RangeSwitch>
    </Toolbar>
  );
};

const RangeSwitch = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Chip = styled(IonChip)`
  min-width: 50px;
  height: 40px;
  border-radius: 32px;
  padding-left: 8px;
  background: ${({ color }) => color};
  color: var(--ion-color-dark);
`;
