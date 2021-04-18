import React from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { IChartProductCategory } from "../../classes/productCategory/IChartProductCategory";
import styled from "styled-components";
import { CircleBadge } from "../../components/common/CircleBadge";

interface Props {
  categories: IChartProductCategory[] | [];
}

export const CategoriesPieChart: React.FC<Props> = ({ categories }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ResponsiveContainer width={"60%"} height={150}>
        <PieChart>
          <Pie
            data={categories}
            dataKey="value"
            nameKey="name"
            innerRadius={35}
            outerRadius={55}
          >
            {categories.map(
              (category: IChartProductCategory, index: number) => (
                <Cell key={`cell-${index}`} fill={category.color} />
              )
            )}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div>
        {categories.map((category: IChartProductCategory, index: number) => (
          <Category>
            <CircleBadge color={category.color} />
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
