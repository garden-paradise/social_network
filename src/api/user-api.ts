import { AxiosPromise } from 'axios';
import { GetItemType, instance, ResponseType } from './api';

export const userAPI = {
  getUsers(
    currentPage: number,
    sizePage: number,
    searchName: string,
    searchFriends: boolean
  ) {
    return instance.get<GetItemType>(
      `users?page=${currentPage}&count=${sizePage}&term=${searchName}&friend=${searchFriends}`
    );
  },
  followUser(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`);
  },
  unfollowUser(userId: number) {
    return instance.delete(
      `follow/${userId}`
    ) as AxiosPromise<ResponseType>;
  },
};
