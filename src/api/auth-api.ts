import {
  instance,
  ResponseType,
  ResultCodeEnum,
  ResultCodeForCaptchaEnum,
} from './api';

type AuthAPIauthMeResType = {
  id: number;
  email: string;
  login: string;
};

type AuthAPILogInOutResType = {
  userId: number;
};

export const authAPI = {
  authMe() {
    return instance.get<ResponseType<AuthAPIauthMeResType>>(`/auth/me`);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string
  ) {
    return instance.post<
      ResponseType<
        AuthAPILogInOutResType,
        ResultCodeEnum | ResultCodeForCaptchaEnum
      >
    >(`/auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete<ResponseType<AuthAPILogInOutResType>>(`/auth/login`);
  },
};
