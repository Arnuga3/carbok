import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell } from "recharts";
import { IMeal } from "../../classes/meal/IMeal";
import { IPieCategory } from "../../classes/productCategory/IPieCategory";
import { chartsDataService } from "../../services/ChartsDataService";
import { IonText } from "@ionic/react";
import { CategoryAvatar } from "../common/products/CategoryAvatar";

interface Props {
  meal: IMeal;
}

export const MealProductsChart: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const categories = chartsDataService.getPieCategoriesData(meal.products);
  return (
    <Wrapper>
      <PieChart height={75} width={75}>
        <Pie
          cx={35}
          stroke="none"
          data={categories}
          dataKey="value"
          nameKey="name"
          innerRadius={10}
          outerRadius={25}
        >
          {categories.map((category: IPieCategory, index: number) => (
            <Cell key={`cell-${index}`} fill={category.color} />
          ))}
        </Pie>
      </PieChart>
      <Categories>
        {categories
          .filter((category) => category.value > 0)
          .map((category: IPieCategory, index: number) => (
            <Category key={index}>
              <CategoryAvatar colors={category.color} />
              <IonText>{t(category.name)}</IonText>
            </Category>
          ))}
      </Categories>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0;
  font-size: 0.7em;
`;
