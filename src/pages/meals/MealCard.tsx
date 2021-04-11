import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { PieChart, Pie, Cell } from "recharts";

import { IMeal } from "../../classes/meal/IMeal";
import { useTranslation } from "react-i18next";
import CalculationService from "../../services/CalculationService";

interface Props {
  meal: IMeal;
}

export const MealCard: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const calculation = new CalculationService();
  const productCategories = calculation.getPieChartData(t, meal.products);
  const carbsData = [
    {
      name: t("carbohydrates"),
      value: calculation.getMealTotalCarbs(meal.products),
      color: 'green',
    },
    {
      name: t("sugars"),
      value: calculation.getMealTotalSugars(meal.products),
      color: 'red',
    },
  ];
  return (
    <IonCard routerLink={`/meals/${meal.id}/products`}>
      <IonCardHeader>
        <IonCardTitle>{t(meal.type.nameKey)}</IonCardTitle>
        <IonCardSubtitle>{meal.products.length} Products</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <PieChart width={150} height={150}>
          <Pie data={carbsData} dataKey="value" nameKey="name" outerRadius={20}>
            {carbsData.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item.color} />
            ))}
          </Pie>
          <Pie
            data={productCategories}
            dataKey="value"
            nameKey="name"
            innerRadius={25}
            outerRadius={35}
          >
            {productCategories.map((category, index) => (
              <Cell key={`cell-${index}`} fill={category.color} />
            ))}
          </Pie>
        </PieChart>
      </IonCardContent>
    </IonCard>
  );
};
