import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ProfileType } from './profiles-reducer';
import { getAuthMe } from './auth-reducer';
import { userAPI } from '../api/user-api';
import { profileAPI } from '../api/profile-api';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const ADD_MY_FRIENDS = 'ADD_MY_FRIENDS';
const ADD_MY_PROFILE = 'ADD_MY_PROFILE';

const initialState = {
  initialized: false as boolean,
  myFriendsProfile: [] as Array<MyFriendsProfileType>,
  myProfile: null as ProfileType | null,
};

export type InitialStateType = typeof initialState;

type ActionType = InferActionsTypes<typeof actions>;

export type MyFriendsProfileType = {
  name: string;
  id: number;
  photos: PhotosType;
  status: string | null;
  followed: boolean;
};

type PhotosType = {
  small: string | null;
  large: string | null;
};

const appReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }
    case ADD_MY_FRIENDS: {
      return {
        ...state,
        myFriendsProfile: [...action.myFriends],
      };
    }
    case ADD_MY_PROFILE: {
      return {
        ...state,
        myProfile: action.myProfile,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () =>
    ({
      type: INITIALIZED_SUCCESS,
    } as const),
  setMyFriends: (myFriends: Array<MyFriendsProfileType>) =>
    ({
      type: ADD_MY_FRIENDS,
      myFriends,
    } as const),
  setMyProfile: (myProfile: ProfileType | null) =>
    ({
      type: ADD_MY_PROFILE,
      myProfile,
    } as const),
};

export const getMyFriends =
  (
    currentPage: any,
    sizePage: any,
    searchName: any,
    searchFriends: any
  ): ThunkType =>
  async (dispatch) => {
    let response = await userAPI.getUsers(
      currentPage,
      sizePage,
      searchName,
      searchFriends
    );
    dispatch(actions.setMyFriends(response.data.items));
  };

export const getMyProfileApp = (): ThunkType => async (dispatch, getState) => {
  let userId = getState().auth.id;
  let isAuth = getState().auth.isAuth;
  if (isAuth && userId != null) {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setMyProfile(response.data));
  }
};

type ThunkType = BaseThunkType<ActionType>;

export const initializeApp = (): ThunkType => (dispatch) => {
  Promise.all([
    dispatch(getAuthMe()),
    dispatch(getMyFriends(1, 100, '', true)),
  ]).then(() => {
    dispatch(getMyProfileApp());
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
