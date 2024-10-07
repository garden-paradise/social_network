export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
  if (!value) return 'Поле обязательно для заполнения';
  return undefined;
};

export const maxLength =
  (number: number): FieldValidatorType =>
  (value) => {
    if (value && value.length > number)
      return `Максимальная длина ${number} символов`;
    return undefined;
  };
