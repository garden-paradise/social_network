import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { WrappedFieldProps } from 'redux-form';
import style from './ValidationForms.module.css';

export const Textarea: React.FC<WrappedFieldProps> = ({
  input,
  meta,
  ...props
}) => {
  const hasError = meta.touched && meta.error;

  return (
    <div>
      <TextareaAutosize
        className={`${style.input_successful} ${hasError && style.input_error}`}
        {...props}
        {...input}
      />
      {hasError && (
        <div className={style.text_error}>
          &#9940;
          {meta.error}
        </div>
      )}
    </div>
  );
};

export const Input: React.FC<WrappedFieldProps> = ({
  input,
  meta,
  ...props
}) => {
  const hasError = meta.touched && meta.error;

  return (
    <div>
      <input
        className={`${style.input_successful} ${hasError && style.input_error}`}
        {...props}
        {...input}
      />
      {hasError && (
        <div className={style.text_error}>
          &#9940;
          {meta.error}
        </div>
      )}
    </div>
  );
};
