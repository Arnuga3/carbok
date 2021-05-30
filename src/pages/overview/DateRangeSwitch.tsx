import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import styled from "styled-components";
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  useIonViewDidEnter,
} from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import { IMeal } from "../../classes/meal/IMeal";
import { IMealProduct } from "../../classes/meal/IMealProduct";
import { CalculationService } from "../../services/CalculationService";
import { CardData } from "./Overview";
import { Range } from "./Overview";
import { dataService } from "../../services/DataService";

interface Props {
  data: CardData;
  onDateRangeChange: (data: CardData) => void;
}

export const DateRangeSwitch: React.FC<Props> = ({
  data,
  onDateRangeChange,
}) => {
  const { t } = useTranslation();
  const c = new CalculationService();

  useIonViewDidEnter(() => {
    if (data.meals.length === 0) {
      getCardRangeData("7_days");
    }
  });

  const getCardRangeData = async (range: Range) => {
    let rangeMeals: IMeal[] = [];
    let products: IMealProduct[] = [];
    const today = new Date();

    switch (range) {
      case "7_days":
        const ago7Days = moment(today).subtract(7, "day").toDate();
        rangeMeals = await dataService.retrieveMealsBetween(ago7Days, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        onDateRangeChange({
          from: ago7Days,
          to: today,
          range,
          meals: rangeMeals,
          categories: c.getPieChartData(products),
        });
        break;

      case "30_days":
        const ago30Days = moment(today).subtract(30, "day").toDate();
        rangeMeals = await dataService.retrieveMealsBetween(ago30Days, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        onDateRangeChange({
          from: ago30Days,
          to: today,
          range,
          meals: rangeMeals,
          categories: c.getPieChartData(products),
        });
        break;

      case "90_days":
        const ago90Days = moment(today).subtract(90, "day").toDate();
        rangeMeals = await dataService.retrieveMealsBetween(ago90Days, today);
        for (const meal of rangeMeals) {
          products = [...products, ...meal.products];
        }
        onDateRangeChange({
          from: ago90Days,
          to: today,
          range,
          meals: rangeMeals,
          categories: c.getPieChartData(products),
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
    <Header mode="ios">
      <RangeSwitch>
        <IonButton
          color={data.range === "90_days" ? "light" : "medium"}
          fill="clear"
          shape="round"
          onClick={getPreviousRange}
        >
          <IonIcon icon={chevronBackOutline} />
        </IonButton>
        <IonTitle color="medium">
          {t("page.overview.carbs.range.card.title", {
            days: data.range.split("_")[0],
          })}
        </IonTitle>
        <IonButton
          color={data.range === "7_days" ? "light" : "medium"}
          fill="clear"
          shape="round"
          onClick={getNextRange}
        >
          <IonIcon icon={chevronForwardOutline} />
        </IonButton>
      </RangeSwitch>
    </Header>
  );
};

const Header = styled(IonHeader)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const RangeSwitch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
