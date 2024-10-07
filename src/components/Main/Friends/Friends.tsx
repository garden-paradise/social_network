import React from 'react';
import style from './Friends.module.css';
import border from '../Main.module.css';
import Preloader from '../../../utils/OverallComponents/Preloader/Preloader';
import PageSwitching from '../../../utils/OverallComponents/PageSwitching/PageSwitching';
import FriendsProfile from './FriendsProfile/FriendsProfile';
import Search from '../../../utils/OverallComponents/Search/Search';
import noSearch from '../../../assets/noSearch.png';
import { MyFriendsProfileType } from '../../../redux/app-reducer';

type FriendsType = {
  totalCount: number;
  sizePage: number;
  currentPage: number;
  searchName: string;
  searchFriends: boolean;
  getUserProfile: (
    currentPage: number,
    sizePage: number,
    searchName: string,
    searchFriends: boolean
  ) => void;
  profiles: Array<MyFriendsProfileType>;
  followUser: (userId: number) => void;
  unfollowUser: (userId: number) => void;
  followingInProgress: Array<number>;
};

const Friends: React.FC<FriendsType> = ({
  currentPage,
  sizePage,
  getUserProfile,
  totalCount,
  profiles,
  followUser,
  unfollowUser,
  followingInProgress,
  searchName,
  searchFriends,
}) => {
  const getUserProfileFunc = (searchName: string, searchFriends: boolean) => {
    return getUserProfile(currentPage, sizePage, searchName, searchFriends);
  };

  if (!profiles) {
    <Preloader />;
  }

  return (
    <main className={`${style.friends} ${border.wrapper}`}>
      <Search
        onChange={(name: any) => {
          //
          getUserProfileFunc(name.searchName, false);
        }}
      />

      <section className={style.friendsSwither}>
        <button
          onClick={() => {
            getUserProfileFunc(searchName, true);
          }}
          className={`${style.friendsSwither__btn} ${
            searchFriends && style.active
          }`}
        >
          Мои друзья
        </button>
        <button
          onClick={() => {
            getUserProfileFunc(searchName, false);
          }}
          className={`${style.friendsSwither__btn} ${
            !searchFriends && style.active
          }`}
        >
          Поиск друзей
        </button>
      </section>

      {!profiles ? ( //
        <article className={style.friends_error}>
          <img
            className={style.friends_error_img}
            src={noSearch}
            alt='noSearchImg'
          />
          <span>Ничего не найдено.</span>
          <span> Попробуйте снова.</span>
        </article>
      ) : (
        <ul>
          {profiles.map((profile) => (
            <FriendsProfile
              name={profile.name}
              status={profile.status}
              key={profile.id}
              id={profile.id}
              photos={profile.photos}
              followed={profile.followed}
              followUser={(userId: number) => {
                followUser(userId);
              }}
              unfollowUser={(userId: number) => {
                unfollowUser(userId);
              }}
              followingInProgress={followingInProgress}
            />
          ))}
        </ul>
      )}

      <PageSwitching
        sizePage={sizePage}
        totalCount={totalCount}
        currentPage={currentPage}
        searchName={searchName}
        searchFriends={searchFriends}
        getUserProfile={getUserProfile}
      />
    </main>
  );
};

export default Friends;
