import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IonChip, IonLabel } from "@ionic/react";
import { CardData } from "./Overview";
import { Range } from "./Overview";
import { dataService } from "../../services/DataService";
import { Meal } from "../../classes/meal/Meal";
import { MealProduct } from "../../classes/meal/MealProduct";
import { chartsDataService } from "../../services/ChartsDataService";
import { dateService } from "../../services/DateService";
// import { Chip } from "../../components/styled/Chip";
import { Toolbar } from "../../components/styled/Toolbar";
import { ChipLabel } from "../../components/common/ChipLabel";

interface Props {
  data: CardData;
  onDateRangeChange: (data: CardData) => void;
}

export const DateRangeSwitch: React.FC<Props> = ({
  data,
  onDateRangeChange,
}) => {
  const { t } = useTranslation();

  const [state, setState] = useState<Range>(data.range);
  useEffect(() => {
    getCardRangeData(state);
  }, [state]);

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
          from: day7Ago,
          to: today,
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
          from: day30Ago,
          to: today,
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
          from: day90Ago,
          to: today,
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
          onClick={() => setState("90_days")}
          color={
            state === "90_days"
              ? "var(--ion-color-secondary)"
              : "var(--ion-color-light-darker)"
          }
        >
          {t("page.overview.carbs.range.card.title", { days: 90 })}
        </Chip>
        <Chip
          onClick={() => setState("30_days")}
          color={
            state === "30_days"
              ? "var(--ion-color-secondary)"
              : "var(--ion-color-light-darker)"
          }
        >
          {t("page.overview.carbs.range.card.title", { days: 30 })}
        </Chip>
        <Chip
          onClick={() => setState("7_days")}
          color={
            state === "7_days"
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
