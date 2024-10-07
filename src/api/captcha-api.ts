import { instance } from './api';

type GetCaptchaUrlResType = {
  url: string;
};

export const captchaAPI = {
  getCaptchaUrl() {
    return instance.get<GetCaptchaUrlResType>(`/security/get-captcha-url`);
  },
};
