import React from "react";
import { useTranslation } from "react-i18next";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { CalculationService } from "../../services/CalculationService";
import { chartColors } from "../../resources/config";
import { IonText } from "@ionic/react";
import { Meal } from "../../classes/meal/Meal";

interface Props {
  meals: Meal[];
}

interface MealData {
  carbs: number;
  sugars: number;
}

export const MealCarbsLinearChart: React.FC<Props> = ({ meals }) => {
  const { t } = useTranslation();
  const calculation = new CalculationService();

  const data: MealData[] = meals.map((meal) => ({
    carbs: calculation.getMealTotalCarbs(meal.products),
    sugars: calculation.getMealTotalSugars(meal.products),
  }));

  const totals = data.reduce(
    (totalData, mealData) => {
      return {
        carbs: totalData.carbs + mealData.carbs,
        sugars: totalData.sugars + mealData.sugars,
      };
    },
    { carbs: 0, sugars: 0 }
  );

  return (
    <>
      <IonText>
        {t("page.overview.carbs.range.card.subtitle", {
          sugarPercent: Math.floor((totals.sugars * 100) / totals.carbs),
        })}
      </IonText>
      <ResponsiveContainer width={"100%"} height={100}>
        <LineChart data={data}>
          {/* <ReferenceLine y={100} label="30%" stroke="red" /> */}
          <Line
            type="monotone"
            dataKey="carbs"
            stroke={chartColors.carbohydrates}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="sugars"
            stroke={chartColors.sugars}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
