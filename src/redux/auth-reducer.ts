import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { captchaAPI } from '../api/captcha-api';
import { initializeApp } from './app-reducer';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const AUTH_ME = 'AUTH_ME';
const GET_CAPTCHA = 'GET_CAPTCHA';

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captcha: null as string | null,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case AUTH_ME: {
      return {
        ...state,
        ...action.auth,
      };
    }
    case GET_CAPTCHA: {
      return {
        ...state,
        captcha: action.captcha,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setAuthMe: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: AUTH_ME,
      auth: { id, email, login, isAuth },
    } as const),
  getCaptcha: (captcha: string) =>
    ({
      type: GET_CAPTCHA,
      captcha,
    } as const),
};

type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const getAuthMe = (): ThunkType => async (dispatch) => {
  const response = await authAPI.authMe();

  if (response.data.resultCode === ResultCodeEnum.Success) {
    const { id, email, login } = response.data.data;
    dispatch(actions.setAuthMe(id, email, login, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ): ThunkType =>
  async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(initializeApp());
    } else if (
      response.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired
    ) {
      dispatch(getCaptchaUrl());
    }
    const errorMesages =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : 'Ошибка...';
    dispatch(stopSubmit('loginForm', { _error: errorMesages }));
  };

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthMe(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await captchaAPI.getCaptchaUrl();
  dispatch(actions.getCaptcha(response.data.url));
};

export default authReducer;
