import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IonButton,
  IonIcon,
  IonText,
  useIonViewDidEnter,
} from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import { CardData } from "./Overview";
import { Range } from "./Overview";
import { dataService } from "../../services/DataService";
import { Meal } from "../../classes/meal/Meal";
import { MealProduct } from "../../classes/meal/MealProduct";
import { chartsDataService } from "../../services/ChartsDataService";
import { dateService } from "../../services/DateService";

interface Props {
  data: CardData;
  onDateRangeChange: (data: CardData) => void;
}

export const DateRangeSwitch: React.FC<Props> = ({
  data,
  onDateRangeChange,
}) => {
  const { t } = useTranslation();

  useIonViewDidEnter(() => {
    if (data.meals.length === 0) {
      getCardRangeData("7_days");
    }
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

  const getPreviousRange = () => {
    switch (data.range) {
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
    switch (data.range) {
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
    <Header>
      <RangeSwitch>
        <IonButton
          color={data.range === "90_days" ? "medium" : "warning"}
          fill="clear"
          shape="round"
          slot="icon-only"
          onClick={getPreviousRange}
        >
          <IonIcon icon={chevronBackOutline} />
        </IonButton>
        <IonText color="warning">
          <h5>
            {t("page.overview.carbs.range.card.title", {
              days: data.range.split("_")[0],
            })}
          </h5>
        </IonText>
        <IonButton
          color={data.range === "7_days" ? "medium" : "warning"}
          fill="clear"
          shape="round"
          slot="icon-only"
          onClick={getNextRange}
        >
          <IonIcon icon={chevronForwardOutline} />
        </IonButton>
      </RangeSwitch>
    </Header>
  );
};

const Header = styled.div`
  width: 100%;
  padding: 0 0 8px 0;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  background-color: var(--ion-color-tertiary);
`;

const RangeSwitch = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
