import React from "react";
import { useTranslation } from "react-i18next";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { chartColors } from "../../resources/config";
import { IonText } from "@ionic/react";
import { Meal } from "../../classes/meal/Meal";
import { calcService } from "../../services/CalculationService";
import { dateService } from "../../services/DateService";
import { chartsDataService } from "../../services/ChartsDataService";

export interface MealData {
  carbs: number;
  sugars: number;
}

interface Props {
  meals: Meal[];
}

export const MealCarbsLinearChart: React.FC<Props> = ({ meals }) => {
  const { t } = useTranslation();

  const data: MealData[] = chartsDataService.getMealsCarbLinearData(meals);

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
      {totals.sugars && totals.carbs && (
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
      )}
    </>
  );
};
