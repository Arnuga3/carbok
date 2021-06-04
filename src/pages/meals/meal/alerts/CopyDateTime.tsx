import React, { Ref } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import moment from "moment";
import { IonDatetime } from "@ionic/react";
import { useMeals } from "../../../../hooks/mealsHook";
import { CopyState } from "./CopyAlert";

interface Props {
  onDateChange: (state: CopyState) => void;
}

export const CopyDatetime = React.forwardRef(
  ({ onDateChange }: Props, ref: Ref<HTMLIonDatetimeElement>) => {
    const { t } = useTranslation();
    const { date } = useMeals();

    return (
      <Datetime
        ref={ref}
        doneText={t("button.copy.to")}
        cancelText={t("button.cancel")}
        monthShortNames={moment.monthsShort()}
        value={moment(date).toISOString()}
        onIonChange={(e: any) =>
          onDateChange({ open: true, date: e.detail.value })
        }
      />
    );
  }
);

const Datetime = styled(IonDatetime)`
  display: none;
`;
