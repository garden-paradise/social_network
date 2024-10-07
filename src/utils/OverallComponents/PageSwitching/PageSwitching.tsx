import React, { useState } from 'react';
import style from '../PageSwitching/PageSwitching.module.css';

type PropsType = {
  totalCount: number;
  sizePage: number;
  searchName: string;
  searchFriends: boolean;
  currentPage: number;
  getUserProfile: (
    currentPage: number,
    sizePage: number,
    searchName: string,
    searchFriends: boolean
  ) => void;
};

const PageSwitching: React.FC<PropsType> = ({
  totalCount,
  sizePage,
  searchName,
  searchFriends,
  currentPage,
  getUserProfile,
}) => {
  let pages = Math.ceil(totalCount / sizePage);

  let totalPages: Array<number> = [];

  for (let i = 0; i < pages; i++) {
    totalPages.push(i + 1);
  }

  const [startingPosition, setStartingPosition] = useState<number>(1);

  const leftPageStartingPosition = (startingPosition - 1) * 10 + 1;

  const rightPageStartingPosition = startingPosition * 10;

  const onSetCurrentPage = (e: any) => {
    //
    getUserProfile(+e.target.innerText, sizePage, searchName, searchFriends);
  };

  return totalPages.length > 1 ? ( 
    <footer className={style.pages}>
      {
        <span
          className={style.pages__navigator}
          onClick={() => {
            leftPageStartingPosition > 1 &&
              setStartingPosition(startingPosition - 1);
          }}
        >
          &#171;
        </span>
      }
      <span>
        {totalPages
          .filter(
            (page) =>
              page >= leftPageStartingPosition &&
              page <= rightPageStartingPosition
          )
          .map((page) => {
            return (
              <span
                className={currentPage === page ? style.pageActive : style.page}
                onClick={onSetCurrentPage}
                key={page}
              >
                {page}
              </span>
            );
          })}
      </span>
      {
        <span
          className={style.pages__navigator}
          onClick={() => {
            rightPageStartingPosition < totalPages.length &&
              setStartingPosition(startingPosition + 1);
          }}
        >
          &#187;
        </span>
      }
    </footer>
  ) : null;
};

export default PageSwitching;
