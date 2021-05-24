import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { restaurant, fastFood, person } from "ionicons/icons";
import { Meal } from "./pages/meals/meal/Meal";
import { AddProduct } from "./pages/products/product/AddProduct";
import { EditProduct } from "./pages/products/product/EditProduct";
import Settings from "./pages/settings/Settings";
import DayMeals from "./pages/meals/DayMeals";
import Products from "./pages/products/Products";
import Overview from "./pages/overview/Overview";

import { useTranslation } from "react-i18next";
import { initAppSettings } from "./redux/actions/appSettingsActions";

import styled from 'styled-components';
import icon from "./resources/icons/logo.svg";

import "./i18n/config";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAppSettings(i18n));
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/:tab(overview)" render={() => <Overview/>} />
            <Route exact path="/:tab(meals)" render={() => <DayMeals/>} />
            <Route exact path="/:tab(meals)/:id/products" component={Meal} />
            <Route exact path="/:tab(products)" render={() => <Products/>} />
            <Route exact path="/:tab(settings)" render={() => <Settings/>} />
            <Route
              exact
              path="/:tab(products)/add-product"
              component={AddProduct}
            />
            <Route
              exact
              path="/:tab(products)/edit-product/:id"
              component={EditProduct}
            />
            <Route exact path="/">
              <Redirect from="/" to="/meals" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="overview" href="/overview">
              <CarbokIcon src={icon} />
              <IonLabel>{t("tab.overview")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="meals" href="/meals">
              <IonIcon icon={restaurant} />
              <IonLabel>{t("tab.meals")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="products" href="/products">
              <IonIcon icon={fastFood} />
              <IonLabel>{t("tab.products")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={person} />
              <IonLabel>{t("tab.settings")}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

const CarbokIcon = styled(IonIcon)`
  // padding-left: 16px;
  // font-size: 24px;

`;
