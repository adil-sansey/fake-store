import React from 'react';
import styles from './AuthorizeForm.module.css';
import TextInput from '../TextInput/TextInput';

function AuthorizeForm(props) {
  return (
    <>
      <div className={styles.darkBG} onClick={props.openOrCloseAuthModal} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Введите данные чтобы войти</h5>
          </div>
          <button className={styles.closeBtn} onClick={props.openOrCloseAuthModal}>
            <div style={{ marginBottom: '-3px', color: 'red' }}> X </div>
          </button>
          <div className={styles.modalContent}>
            <form className={styles.auth_form}>
              <TextInput
                type="text"
                value={props.user.name.value}
                isValid={props.user.name.isValid}
                onChange={props.onChangeHandler}
                id="name"
                placeholder="Имя"
                message={
                  props.isWrongEmailOrPass
                    ? props.isWrongEmailOrPass
                    : 'Имя должно начинаться с большой буквы'
                }
              />
              <TextInput
                type="email"
                value={props.user.email.value}
                isValid={props.user.email.isValid}
                onChange={props.onChangeHandler}
                id="email"
                placeholder="Email"
                message={
                  props.isWrongEmailOrPass
                    ? props.isWrongEmailOrPass
                    : 'Невалидный адрес электронной почты'
                }
              />
              <TextInput
                type="password"
                value={props.user.password.value}
                isValid={props.user.password.isValid}
                onChange={props.onChangeHandler}
                id="password"
                placeholder="Пароль"
                message={
                  props.isWrongEmailOrPass
                    ? props.isWrongEmailOrPass
                    : 'Пароль должен быть длиной не менее 8 символов'
                }
              />
              <TextInput
                type="password"
                value={props.user.repeat_password.value}
                isValid={props.user.repeat_password.isValid}
                onChange={props.onChangeHandler}
                id="repeat_password"
                placeholder="Повторите пароль"
                message={
                  props.isWrongEmailOrPass ? props.isWrongEmailOrPass : 'Пароли должны совпадать'
                }
              />

              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button className={styles.authorizeBtn} onClick={props.authorize}>
                    Зарегистрироваться
                  </button>
                  <button className={styles.cancelBtn} onClick={props.openOrCloseAuthModal}>
                    Отмена
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthorizeForm;
