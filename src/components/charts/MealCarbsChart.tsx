import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ResponsiveContainer, Bar, BarChart, CartesianGrid } from "recharts";
import { IonText } from "@ionic/react";
import { IMeal } from "../../classes/meal/IMeal";
import { chartColors } from "../../resources/config";
import { calcService } from "../../services/CalculationService";
import { CategoryAvatar } from "../common/products/CategoryAvatar";

interface Props {
  meal: IMeal;
}

export const MealCarbsChart: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();

  const registeredProducts = meal.products.filter((p) => !p.dummy);
  const totalCarbs = calcService.getMealTotalCarbs(registeredProducts);
  const totalSugars = calcService.getMealTotalSugars(registeredProducts);
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
                  sugars: calcService.getMealTotalSugars(registeredProducts),
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
                <CategoryAvatar colors={chartColors.carbohydrates} />
                <IonText>
                  {`${t("carbohydrates")}: ${totalCarbs}${t(
                    "units.grams.short"
                  )}`}
                </IonText>
              </CarbsLabel>
              <CarbsLabel>
                <CategoryAvatar colors={chartColors.sugars} />
                <IonText>
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
