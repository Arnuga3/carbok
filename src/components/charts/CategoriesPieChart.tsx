import React from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { IPieCategory } from "../../classes/productCategory/IPieCategory";
import styled from "styled-components";
import { CategoryAvatar } from "../common/products/CategoryAvatar";

interface Props {
  categories: IPieCategory[] | [];
}

export const CategoriesPieChart: React.FC<Props> = ({ categories }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ResponsiveContainer width={"60%"} height={150}>
        <PieChart>
          <Pie
            stroke="none"
            data={categories}
            dataKey="value"
            nameKey="name"
            innerRadius={32}
            outerRadius={55}
          >
            {categories.map((category: IPieCategory, index: number) => (
              <Cell key={`cell-${index}`} fill={category.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div>
        {categories.map((category: IPieCategory, index: number) => (
          <Category key={index}>
            <CategoryAvatar colors={category.color} />
            {t(category.name)}
          </Category>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0px 8px;
`;
