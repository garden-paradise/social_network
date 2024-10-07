import React, { useEffect } from 'react';
import style from '../Messages/Messages.module.css';
import ListFriends from './ListFriends/ListFriends';
import ListMessagesContainer from './ListMessages/ListMessagesContainer';
import AddMessageForm from './AddMessage/AddMessage';

const Messages: React.FC<any> = ({
  getUserProfile,
  currentPage,
  sizePage,
  searchName,
  searchFriends,
  profiles,
  addMessage,
}) => {
  useEffect(() => {
    getUserProfile(currentPage, sizePage, searchName, searchFriends);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickDate = new Date();

  const addNewMessage = (message: { textArea: string }) => {
    addMessage(
      message.textArea.trim(),
      clickDate.toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
      })
    );
  };

  return (
    profiles && (
      <main className={style.messages}>
        <ListFriends profiles={profiles} />
        <ListMessagesContainer />
        <AddMessageForm onSubmit={addNewMessage} />
      </main>
    )
  );
};

export default Messages;
