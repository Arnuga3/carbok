import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ResponsiveContainer, Bar, BarChart, CartesianGrid } from "recharts";
import { IonText } from "@ionic/react";
import { IMeal } from "../../classes/meal/IMeal";
import { CircleBadge } from "./CircleBadge";
import CalculationService from "../../services/CalculationService";
import { chartColors } from "../../resources/config";

interface Props {
  meal: IMeal;
}

export const MealCarbsChart: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const calculation = new CalculationService();
  const totalCarbs = calculation.getMealTotalCarbs(meal.products);
  const totalSugars = calculation.getMealTotalSugars(meal.products);
  const sugarPercentage = calculation.getPercentsOfSugars(
    totalSugars,
    totalCarbs
  );
  return (
    <Wrapper>
      {meal.products.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={75}>
            <BarChart maxBarSize={18}
              data={[
                {
                  carbs: totalCarbs,
                  sugars: calculation.getMealTotalSugars(meal.products),
                },
              ]}
            >
              <CartesianGrid stroke="none" />
              <Bar dataKey="carbs" fill={chartColors.carbohydrates} />
              <Bar dataKey="sugars" fill={chartColors.sugars} />
            </BarChart>
          </ResponsiveContainer>
          <div>
            <CarbsLabel>
              <CircleBadge color={chartColors.carbohydrates} />
              <IonText>
                {`${t("carbohydrates")}: ${totalCarbs}${t(
                  "units.grams.short"
                )}`}
              </IonText>
            </CarbsLabel>
            <CarbsLabel>
              <CircleBadge color={chartColors.sugars} />
              <IonText>
                {` ${t("of.which.sugars")}: ${Math.floor(sugarPercentage)}%`}
              </IonText>
            </CarbsLabel>
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
`;

const CarbsLabel = styled(IonText)`
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;
