import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ResponsiveContainer, Bar, BarChart, CartesianGrid } from "recharts";
import { IonText } from "@ionic/react";
import { IMeal } from "../../classes/meal/IMeal";
import { CircleBadge } from "../common/CircleBadge";
import { chartColors } from "../../resources/config";
import { calcService } from "../../services/CalculationService";

interface Props {
  meal: IMeal;
}

export const MealCarbsChart: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const totalCarbs = calcService.getMealTotalCarbs(meal.products);
  const totalSugars = calcService.getMealTotalSugars(meal.products);
  const sugarPercentage = calcService.getPercentsOfSugars(
    totalSugars,
    totalCarbs
  );
  return (
    <Wrapper>
      {meal.products.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={75}>
            <BarChart
              maxBarSize={18}
              data={[
                {
                  carbs: totalCarbs,
                  sugars: calcService.getMealTotalSugars(meal.products),
                },
              ]}
            >
              <CartesianGrid stroke="none" />
              <Bar dataKey="carbs" fill={chartColors.carbohydrates} />
              <Bar dataKey="sugars" fill={chartColors.sugars} />
            </BarChart>
          </ResponsiveContainer>
          <Labels>
            <div>
              <CarbsLabel>
                <CircleBadge color={chartColors.carbohydrates} />
                <IonText color="white">
                  {`${t("carbohydrates")}: ${totalCarbs}${t(
                    "units.grams.short"
                  )}`}
                </IonText>
              </CarbsLabel>
              <CarbsLabel>
                <CircleBadge color={chartColors.sugars} />
                <IonText color="white">
                  {`${t("of.which.sugars")}: ${Math.floor(sugarPercentage)}%`}
                </IonText>
              </CarbsLabel>
            </div>
          </Labels>
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
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 8px;
`;

const CarbsLabel = styled(IonText)`
  display: flex;
  align-items: center;
  margin: 2px 0;
  font-size: 0.7em;
`;
