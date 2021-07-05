import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Meal } from "./pages/meals/meal/Meal";
import { AddProduct } from "./pages/products/product/AddProduct";
import { EditProduct } from "./pages/products/product/EditProduct";
import { DayMeals } from "./pages/meals/DayMeals";
import Settings from "./pages/settings/Settings";
import Products from "./pages/products/Products";
import Overview from "./pages/overview/Overview";
import Home from "./pages/home/Home";

import { useTranslation } from "react-i18next";
import { initAppSettings } from "./redux/actions/appSettingsActions";

import CChartIcon from "./resources/icons/chart.svg";
import CCalculatorIcon from "./resources/icons/calculator.svg";
import CLogoIcon from "./resources/icons/logo.svg";
import CMealsIcon from "./resources/icons/meals.svg";
import CProductsIcon from "./resources/icons/products.svg";

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
import { CarbokIcon } from "./components/styled/CarbokIcon";
import { Calculator } from "./pages/calculator/Calculator";

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
            <Route exact path="/:tab(overview)" render={() => <Overview />} />
            <Route
              exact
              path="/:tab(calculator)"
              render={() => <Calculator />}
            />
            <Route exact path="/:tab(home)" render={() => <Home />} />
            <Route exact path="/:tab(meals)" component={DayMeals} />
            <Route exact path="/:tab(meals)/:id/products" component={Meal} />
            <Route exact path="/:tab(products)" render={() => <Products />} />
            <Route exact path="/settings" render={() => <Settings />} />
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
              <Redirect from="/" to="/home" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="overview" href="/overview">
              <CarbokIcon src={CChartIcon} />
            </IonTabButton>
            <IonTabButton tab="calculator" href="/calculator">
              <CarbokIcon src={CCalculatorIcon} />
            </IonTabButton>
            <IonTabButton tab="home" href="/home">
              <CarbokIcon src={CLogoIcon} style={{ paddingBottom: 4 }} size="40" />
            </IonTabButton>
            <IonTabButton tab="meals" href="/meals">
              <CarbokIcon src={CMealsIcon} />
            </IonTabButton>
            <IonTabButton tab="products" href="/products">
              <CarbokIcon src={CProductsIcon} size="40" />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
