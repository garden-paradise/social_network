import { Dispatch } from 'react';
import { userAPI } from '../api/user-api';
import { MyFriendsProfileType } from './app-reducer';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_SEARCH_NAME = 'SET_SEARCH_NAME';
const SET_SEARCH_FRIENDS = 'SET_SEARCH_FRIENDS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

const initialState = {
  profiles: [] as Array<MyFriendsProfileType>,
  currentPage: 1,
  sizePage: 10,
  totalCount: 0,
  searchName: '',
  searchFriends: true,
  isToggle: false,
  followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return {
        ...state,
        profiles: action.profiles,
      };
    }
    case SET_TOTAL_COUNT: {
      return {
        ...state,
        totalCount: action.totalCount,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case SET_SEARCH_NAME: {
      return {
        ...state,
        searchName: action.searchName,
      };
    }
    case SET_SEARCH_FRIENDS: {
      return {
        ...state,
        searchFriends: action.searchFriends,
      };
    }
    case FOLLOW: {
      return {
        ...state,
        profiles: state.profiles.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        profiles: state.profiles.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    }
    case FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isToggle
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setUserProfile: (profiles: Array<MyFriendsProfileType>) =>
    ({
      type: SET_USER_PROFILE,
      profiles,
    } as const),
  setTotalCount: (totalCount: number) =>
    ({
      type: SET_TOTAL_COUNT,
      totalCount,
    } as const),
  toggleFollowingInProgress: (isToggle: boolean, userId: number) =>
    ({
      type: FOLLOWING_IN_PROGRESS,
      isToggle,
      userId,
    } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: SET_CURRENT_PAGE,
      currentPage,
    } as const),
  setSearchName: (searchName: string) =>
    ({
      type: SET_SEARCH_NAME,
      searchName,
    } as const),
  setSearchFriends: (searchFriends: boolean) =>
    ({
      type: SET_SEARCH_FRIENDS,
      searchFriends,
    } as const),
  follow: (userId: number) =>
    ({
      type: FOLLOW,
      userId,
    } as const),
  unfollow: (userId: number) =>
    ({
      type: UNFOLLOW,
      userId,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;

export const getUserProfile =
  (
    currentPage: number,
    sizePage: number,
    searchName: string,
    searchFriends: boolean
  ): ThunkType =>
  async (dispatch) => {
    let response = await userAPI.getUsers(
      currentPage,
      sizePage,
      searchName,
      searchFriends
    );

    dispatch(actions.setUserProfile(response.data.items));
    dispatch(actions.setTotalCount(response.data.totalCount));

    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setSearchName(searchName));
    dispatch(actions.setSearchFriends(searchFriends));
  };

const _followUnfollow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMetod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  let response = await apiMetod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
    dispatch(actions.toggleFollowingInProgress(false, userId));
  }
  dispatch(actions.toggleFollowingInProgress(true, userId));
};

export const followUser = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollow(
      dispatch,
      userId,
      userAPI.followUser.bind(userId),
      actions.follow
    );
  };
};

export const unfollowUser = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollow(
      dispatch,
      userId,
      userAPI.unfollowUser.bind(userId),
      actions.unfollow
    );
  };
};

export default usersReducer;
