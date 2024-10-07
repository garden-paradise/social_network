import { AppStateType } from '../redux/redux-store';

export const getAuthLogin = (state: AppStateType) => {
  return state.auth.login;
};

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const getAuthId = (state: AppStateType) => {
  return state.auth.id;
};

export const getCaptchaImg = (state: AppStateType) => {
  return state.auth.captcha;
};
