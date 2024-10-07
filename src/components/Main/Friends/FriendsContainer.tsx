import Friends from './Friends';
import { connect } from 'react-redux';
import {
  followUser,
  getUserProfile,
  unfollowUser,
} from '../../../redux/users-reducer';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import {
  getUsersCurrentPage,
  getUsersFollowingInProgress,
  getUsersProfiles,
  getUsersSearchFriends,
  getUsersSearchName,
  getUsersSizePage,
  getUsersTotalCount,
} from '../../../selectors/users-selectors';
import { AppStateType } from '../../../redux/redux-store';
import { MyFriendsProfileType } from '../../../redux/app-reducer';

type MapStateToPropsType = {
  totalCount: number;
  sizePage: number;
  currentPage: number;
  searchName: string;
  searchFriends: boolean;
  profiles: Array<MyFriendsProfileType>;
  followingInProgress: Array<number>;
};

type MapDispatchToPropsType = {
  getUserProfile: (
    currentPage: number,
    sizePage: number,
    searchName: string,
    searchFriends: boolean
  ) => void;
  followUser: (userId: number) => void;
  unfollowUser: (userId: number) => void;
};

const mapStateToProps = (state: AppStateType) => {
  return {
    profiles: getUsersProfiles(state),
    currentPage: getUsersCurrentPage(state),
    sizePage: getUsersSizePage(state),
    totalCount: getUsersTotalCount(state),
    searchName: getUsersSearchName(state),
    searchFriends: getUsersSearchFriends(state),
    followingInProgress: getUsersFollowingInProgress(state),
  };
};

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, void, AppStateType>(
    mapStateToProps,
    {
      getUserProfile,
      followUser,
      unfollowUser,
    }
  ),
  withAuthRedirect
)(Friends);
