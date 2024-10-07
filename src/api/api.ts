import axios from 'axios';
import { MyFriendsProfileType } from '../redux/app-reducer';

export let instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '4d24835c-6adc-4ace-bc52-90f3f44a806b',
  },
});

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  resultCode: RC;
  messages: Array<string>;
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type GetItemType = {
  items: Array<MyFriendsProfileType>;
  totalCount: number;
  error: string | null;
};
