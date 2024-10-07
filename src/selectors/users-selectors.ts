import { AppStateType } from '../redux/redux-store';

export const getUsersProfiles = (state: AppStateType) => {
  return state.users.profiles;
};
export const getUsersCurrentPage = (state: AppStateType) => {
  return state.users.currentPage;
};
export const getUsersSizePage = (state: AppStateType) => {
  return state.users.sizePage;
};
export const getUsersTotalCount = (state: AppStateType) => {
  return state.users.totalCount;
};
export const getUsersSearchName = (state: AppStateType) => {
  return state.users.searchName;
};
export const getUsersSearchFriends = (state: AppStateType) => {
  return state.users.searchFriends;
};
export const getUsersFollowingInProgress = (state: AppStateType) => {
  return state.users.followingInProgress;
};
