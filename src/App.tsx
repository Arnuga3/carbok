import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, calculatorOutline, pizzaOutline, fastFoodOutline } from 'ionicons/icons';
import Home from './pages/home/Home';
import Calculator from './pages/calculator/Calculator';
import { Meals } from './pages/meals/Meals';
import { Meal } from './pages/meals/meal/Meal';
import { Products } from './pages/products/Products';
import { AddProduct } from './pages/products/product/AddProduct';

import './i18n/config';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { EditProduct } from './pages/products/product/EditProduct';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>

        <IonRouterOutlet>
          <Route exact path='/:tab(home)' component={Home}/>
          <Route exact path='/:tab(calculator)' component={Calculator}/>
          <Route exact path='/:tab(meals)' component={Meals}/>
          <Route exact path='/:tab(meals)/:id/products' component={Meal} />
          <Route exact path='/:tab(products)' component={Products}/>
          <Route exact path='/:tab(products)/add-product' component={AddProduct}/>
          <Route exact path='/:tab(products)/edit-product/:id' component={EditProduct}/>
          <Route exact path='/'>
            <Redirect from='/' to='/meals'/>
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot='bottom'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab='calculator' href='/calculator'>
            <IonIcon icon={calculatorOutline} />
            <IonLabel>Calulator</IonLabel>
          </IonTabButton>
          <IonTabButton tab='meals' href='/meals'>
            <IonIcon icon={fastFoodOutline} />
            <IonLabel>Meals</IonLabel>
          </IonTabButton>
          <IonTabButton tab='products' href='/products'>
            <IonIcon icon={pizzaOutline} />
            <IonLabel>Products</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
