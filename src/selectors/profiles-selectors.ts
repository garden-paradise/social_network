import { AppStateType } from "../redux/redux-store";

export const getProfilesPosts = (state: AppStateType) => {
  return state.profiles.posts;
};

export const getProfilesProfile = (state: AppStateType) => {
  return state.profiles.profile;
};

export const getProfilesProfileSetting = (state: AppStateType) => {
  return state.profiles.profileForSettings;
};

export const getProfilesStatus = (state: AppStateType) => {
  return state.profiles.status;
};

export const getProfilesUpdateAvatar = (state: AppStateType) => {
  return state.profiles.updateAvatar;
};

export const getProfilesUpdateInfo = (state: AppStateType) => {
  return state.profiles.updateInfo;
};
