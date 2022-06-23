import React from 'react';
import Label from '../Label/Label';
import styles from './TextInput.module.css';

function TextInput(props) {
  let style = styles.input;
  let message = null;

  if (props.isValid !== null) {
    style = props.isValid
      ? `${styles.input} ${styles.valid_value}`
      : `${styles.input} ${styles.invalid_value}`;

    if (props.value !== '') {
      message = props.isValid ? null : <div className={styles.message}>{props.message}</div>;
    } else {
      message = <div className={styles.message}>Поле пустое. Заполните пожалуйста</div>;
    }
  }

  return (
    <>
      <Label htmlFor={props.id} placeholder={props.placeholder} />
      <input
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        className={style}
      />
      {message}
    </>
  );
}

export default TextInput;
