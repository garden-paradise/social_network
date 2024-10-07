import React, { useState } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import style from './MyStatus.module.css';

type PropsType = { status: string; handleSubmit: () => void };

const MyStatus: React.FC<PropsType & InjectedFormProps<{}, PropsType>> = ({
  status,
  handleSubmit,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div
      className={style.status}
      onClick={() => {
        setEditMode(true);
      }}
    >
      {!editMode && <span>{status || <i>Статус не указан</i>}</span>}

      {editMode && (
        <form onBlur={handleSubmit} onKeyPress={onKeyPressHandler}>
          <Field
            name='statusInputForm'
            component='input'
            placeholder=' Введите текст статуса...'
            maxlength='300'
            autoFocus={true}
            value={status}
            onBlur={() => {
              setEditMode(false);
            }}
          />
        </form>
      )}
    </div>
  );
};

export default reduxForm<{}, PropsType>({
  form: 'userMyStatus',
})(MyStatus);
