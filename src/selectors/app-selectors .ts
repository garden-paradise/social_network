import { createSelector } from 'reselect';
import { MyFriendsProfileType } from '../redux/app-reducer';
import { AppStateType } from '../redux/redux-store';

export const getMyFriendsProfile = (state: AppStateType) => {
  return state.app.myFriendsProfile;
};

export const getMyProfile = (state: AppStateType) => {
  return state.app.myProfile;
};

export const getInitialized = (state: AppStateType) => {
  return state.app.initialized;
};

export const showMyFriends = createSelector(getMyFriendsProfile, (users) => {
  function shuffle(arr: Array<MyFriendsProfileType>) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  let profile = shuffle(users).slice(0, 4);

  return profile.slice(0, 4);
});
