import { i18n } from "i18next";
import { Dispatch } from "redux";
import { IAppSettings } from "../../classes/appSettings/IAppSettings";
import { AppSettingsStorageService } from "../../services/AppSettingsStorageService";

export enum AppSettingsActions {
  SET_APP_SETTINGS = "SET_APP_SETTINGS",
}
export type AppSettingsActionType = SetAppSettings;

interface SetAppSettings {
  type: AppSettingsActions.SET_APP_SETTINGS;
  settings: IAppSettings;
}

const setAppSettings = (settings: IAppSettings): SetAppSettings => ({
  type: AppSettingsActions.SET_APP_SETTINGS,
  settings,
});

export const initAppSettings = (i18n: i18n) => {
  return async (dispatch: Dispatch) => {
    try {
      const appSettingsStorageSvc = new AppSettingsStorageService();
      const settings = await appSettingsStorageSvc.get();
      if (settings) {
        i18n.changeLanguage(settings.language);
        dispatch(setAppSettings(settings));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeAppSettings = (settings: IAppSettings) => {
  return async (dispatch: Dispatch) => {
    try {
      const appSettingsStorageSvc = new AppSettingsStorageService();
      await appSettingsStorageSvc.set(settings);
      dispatch(setAppSettings(settings));
    } catch (e) {
      console.log(e);
    }
  };
};