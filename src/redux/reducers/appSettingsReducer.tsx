import { Reducer } from "redux";
import { IAppSettings } from "../../classes/appSettings/IAppSettings";
import { AppSettingsActions } from "../actions/appSettingsActions";

import { defaultAppSettings } from "../../resources/config";

export interface AppSettingsState {
  settings: IAppSettings;
}

const defaultState: AppSettingsState = {
  settings: defaultAppSettings,
};

const reducer: Reducer<AppSettingsState> = (
  state: AppSettingsState = defaultState,
  action
) => {
  switch (action.type) {
    case AppSettingsActions.SET_APP_SETTINGS:
      return {
        ...state,
        settings: action.settings,
      };

    default:
      return state;
  }
};

export { reducer as appSettingsReducer };
