import { FormAction } from 'redux-form';
import { profileAPI } from '../api/profile-api';
import { getMyProfileApp } from './app-reducer';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_PROFILE_SETTINGS = 'SET_PROFILE_SETTINGS';
const SET_STATUS = 'SET_STATUS';
const SET_AVATAR_PHOTO = 'SET_AVATAR_PHOTO';
const SET_AVATAR_PHOTO_UPDATE = 'SET_AVATAR_PHOTO_UPDATE';
const SET_INFO_UPDATE = 'SET_INFO_UPDATE';

const initialState = {
  posts: [
    {
      id: 0,
      textPost:
        'Выступая на организованной компанией Google конференции Zeitgeist Conference в 2011 году, Стивен Хокинг высказался следующим образом об отношениях философии и науки применительно к вопросам познания Вселенной: «Большинство из нас не думают об этом всё время, но, время от времени, почти каждый задумывается — зачем мы здесь? Откуда мы появились? Исторически, это считалось вопросами философии. Но философия мертва. Философы не поспевают за современными достижениями науки, в особенности физики. Теперь учёные приняли эстафету открытий в нашем квесте познания».',
      datePost: '4 июля, 18:39',
    },
    {
      id: 1,
      textPost:
        'Несмотря на то, что Хокинг «похоронил» философию, едва ли найдётся хотя бы один философ, который возразит по поводу ценности и нужности научных данных — поэтому спорил великий физик тут не столько с философами, сколько со своим собственным представлением о философии. Это высказывание — хороший повод для серьёзного об отношениях науки и философии, точнее — об отношении философии с научным методом.',
      datePost: '5 июля, 13:29',
    },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  profileForSettings: null as ProfileType | null,
  status: '',
  updateAvatar: false,
  updateInfo: false,
};

type PostsType = {
  id: number;
  textPost: string;
  datePost: string;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};

type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;

const postReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [
          {
            id: state.posts.length,
            textPost: action.textPost,
            datePost: action.datePost,
          },
          ...state.posts,
        ],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.idPost),
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_PROFILE_SETTINGS: {
      return {
        ...state,
        profileForSettings: action.profileForSettings,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_AVATAR_PHOTO: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photoFile,
        } as ProfileType,
      };
    }
    case SET_AVATAR_PHOTO_UPDATE: {
      return {
        ...state,
        updateAvatar: action.isUpdate,
      };
    }
    case SET_INFO_UPDATE: {
      return {
        ...state,
        updateInfo: action.isUpdate,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPost: (textPost: string, datePost: string) =>
    ({
      type: ADD_POST,
      textPost,
      datePost,
    } as const),
  deletePost: (idPost: number) =>
    ({
      type: DELETE_POST,
      idPost,
    } as const),
  setProfile: (profile: ProfileType) =>
    ({
      type: SET_PROFILE,
      profile,
    } as const),
  setProfileSettings: (profileForSettings: ProfileType) =>
    ({
      type: SET_PROFILE_SETTINGS,
      profileForSettings,
    } as const),
  setStatus: (status: string) =>
    ({
      type: SET_STATUS,
      status,
    } as const),
  setAvatarPhoto: (photoFile: PhotosType) =>
    ({
      type: SET_AVATAR_PHOTO,
      photoFile,
    } as const),
  setAvatarPhotoUpdate: (isUpdate: boolean) =>
    ({
      type: SET_AVATAR_PHOTO_UPDATE,
      isUpdate,
    } as const),
  setInfoUpdate: (isUpdate: boolean) =>
    ({
      type: SET_INFO_UPDATE,
      isUpdate,
    } as const),
};

type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const getProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setProfile(response.data));
  };

export const getProfileSettings =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setProfileSettings(response.data));
  };

export const getMyStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response.data));
  };

export const updateMyStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };

export const updateAvatarPhoto =
  (photoFile: PhotosType): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.savePhoto(photoFile);
    if (response.data.resultCode === 0) {
      dispatch(actions.setAvatarPhoto(response.data.data.photos));
      dispatch(getMyProfileApp());
      dispatch(actions.setAvatarPhotoUpdate(true));
      const timer = setTimeout(() => {
        dispatch(actions.setAvatarPhotoUpdate(false));
        clearTimeout(timer);
      }, 1000);
    }
  };

export const updateProfileInfo =
  (profileInfo: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    let userId = getState().auth.id;
    let response = await profileAPI.saveProfileInfo(profileInfo);
    if (response.data.resultCode === 0) {
      if (userId != null) {
        dispatch(getProfile(userId));
        dispatch(getProfileSettings(userId));
      }
      dispatch(actions.setInfoUpdate(true));
      const timer = setTimeout(() => {
        dispatch(actions.setInfoUpdate(false));
        clearTimeout(timer);
      }, 1000);
    }
  };

export default postReducer;
