import React from 'react';
import styles from './LoginForm.module.css';
import TextInput from '../TextInput/TextInput';

function LoginForm(props) {
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
              {/* <label className={styles.label} htmlFor="email">
                Email:
              </label>
              <input
                onChange={props.onChangeHandler}
                className={
                  props.user.isValidData
                    ? styles.password
                    : `${styles.password} ${styles.invalid_data}`
                }
                type="email"
                id="email"
              /> */}
              <TextInput
                type="password"
                value={props.user.password.value}
                isValid={props.user.password.isValid}
                onChange={props.onChangeHandler}
                id="password"
                placeholder="Password"
                message={
                  props.isWrongEmailOrPass
                    ? props.isWrongEmailOrPass
                    : 'Пароль должен быть длиной не менее 8 символов'
                }
              />
              {/* <label className={styles.label} htmlFor="password">
                Пароль:
              </label>
              <input
                onChange={props.onChangeHandler}
                className={
                  props.user.isValidData ? styles.email : `${styles.email} ${styles.invalid_data}`
                }
                type="password"
                id="password"
              /> */}

              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button className={styles.logInBTN} onClick={props.login}>
                    Войти
                  </button>
                  <button className={styles.cancelBtn} onClick={props.openOrCloseAuthModal}>
                    Отмена
                  </button>
                </div>
                <div className={styles.actionsContainer}>
                  <div className={styles.line} />
                  ИЛИ
                  <div className={styles.line} />
                </div>
                <div className={styles.actionsContainer}>
                  <button className={styles.authorizeBTN} onClick={props.showAuthorizeForm}>
                    Зарегистрируйтесь
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

export default LoginForm;
