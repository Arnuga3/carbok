import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Calculator: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Calculator;
