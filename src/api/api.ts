import axios from 'axios';
import { MyFriendsProfileType } from '../redux/app-reducer';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

export let instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    // 'API-KEY': 'e9c26744-99a1-4391-9d00-e03a7fab4f78',
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
