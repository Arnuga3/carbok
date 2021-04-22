import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { IMeal } from "../../classes/meal/IMeal";
import CalculationService from "../../services/CalculationService";

interface Props {
  meal: IMeal;
}

export const MealProductsChart: React.FC<Props> = ({ meal }) => {
  const calculation = new CalculationService();
  const productCategories = calculation.getPieChartData(meal.products);
  const carbsData = calculation.getPieChartCarbSugarPercents(meal.products);
  return (
    <PieChart width={75} height={75}>
      <Pie
        stroke="none"
        data={carbsData}
        dataKey="value"
        nameKey="name"
        outerRadius={15}
      >
        {carbsData.map((item, index) => (
          <Cell key={`cell-${index}`} fill={item.color} />
        ))}
      </Pie>
      <Pie
        stroke="none"
        data={productCategories}
        dataKey="value"
        nameKey="name"
        innerRadius={20}
        outerRadius={32}
      >
        {productCategories.map((category, index) => (
          <Cell key={`cell-${index}`} fill={category.color} />
        ))}
      </Pie>
    </PieChart>
  );
};
