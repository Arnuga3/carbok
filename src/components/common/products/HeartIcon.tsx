import { IonIcon } from "@ionic/react";
import { heartCircle } from "ionicons/icons";
import { HeartIconWrapper } from "../../styled/HeartIconWrapper";

export const HeartIcon: React.FC = () => {
  return (
    <HeartIconWrapper>
      <IonIcon icon={heartCircle} color="danger" />
    </HeartIconWrapper>
  );
};
