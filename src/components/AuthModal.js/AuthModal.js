import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import AuthorizeForm from '../AuthorizeForm/AuthorizeForm';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../store/actions';

const AuthModal = (props) => {
  const dispatch = useDispatch();
  const [isShowAuthorizeForm, setIsShowAuthorizeForm] = useState(false);

  //TODO change user state back to default!!! user
  const [authFormData, setAuthFormData] = useState({
    email: { value: 'john@mail.com', isValid: true },
    password: { value: 'changeme', isValid: true },
  });

  const [isWrongEmailOrPass, setIsWrongEmailOrPass] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const showAuthorizeForm = (e) => {
    e.preventDefault();

    setAuthFormData({
      name: { value: '', isValid: null },
      email: { value: '', isValid: null },
      password: { value: '', isValid: null },
      repeat_password: { value: '', isValid: null },
    });
    setIsShowAuthorizeForm(true);
  };

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    let isValid = true;

    switch (id) {
      case 'name':
        if (value === '') {
          isValid = false;
          break;
        }
        const isFirstLetterCapitalized = value[0] === value[0].toUpperCase();

        if (!isFirstLetterCapitalized) {
          isValid = false;
        }
        break;

      case 'email':
        if (value === '') {
          isValid = false;
          break;
        }
        break;

      case 'password':
        if (value === '' || value.length < 8) {
          isValid = false;
          break;
        }
        break;

      case 'repeat_password':
        if (value === '' || value !== authFormData.password.value) {
          isValid = false;
          break;
        }
        break;

      default:
        break;
    }

    setAuthFormData({ ...authFormData, [id]: { value, isValid } });
  };

  const authorize = (e) => {
    e.preventDefault();

    for (let prop in authFormData) {
      if (!authFormData[prop].isValid) {
        return;
      }
    }

    fetch('https://api.escuelajs.co/api/v1/users/is-available', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: authFormData.email.value }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        if (!data.isAvailable) {
          setAuthFormData({ ...authFormData, email: { ...authFormData.email, isValid: false } });
          setIsWrongEmailOrPass('Адрес электронной почты уже зарегестрирован!');

          return data;
        }

        return fetch('https://api.escuelajs.co/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: authFormData.name.value,
            email: authFormData.email.value,
            password: authFormData.password.value,
          }),
        });
      })
      .then((response) => {
        console.log(response);
        // looks like the api no longer allows to create new users
        // TODO
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = (e) => {
    e.preventDefault();

    if (!authFormData.email.isValid) {
      setAuthFormData({ ...authFormData, email: { ...authFormData.email, isValid: false } });

      return;
    }

    if (!authFormData.password.isValid) {
      setAuthFormData({ ...authFormData, password: { ...authFormData.password, isValid: false } });

      return;
    }

    fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authFormData.email.value,
        password: authFormData.password.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setAuthFormData({
            email: { ...authFormData.email, isValid: false },
            password: { ...authFormData.password, isValid: false },
          });
          setIsWrongEmailOrPass('Неверный email или пароль!');

          return new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        if (!data.access_token) {
          return data;
        }

        return fetch('https://api.escuelajs.co/api/v1/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          return response;
        }

        return response.json();
      })
      .then((data) => {
        if (data instanceof Error) {
          return data;
        }

        dispatch(logInUser(data));
        props.openOrCloseAuthModal(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!isShowAuthorizeForm) {
    return (
      <LoginForm
        isWrongEmailOrPass={isWrongEmailOrPass}
        openOrCloseAuthModal={props.openOrCloseAuthModal}
        onChangeHandler={onChangeHandler}
        login={login}
        showAuthorizeForm={showAuthorizeForm}
        authFormData={authFormData}
      />
    );
  }

  return (
    <AuthorizeForm
      isWrongEmailOrPass={isWrongEmailOrPass}
      openOrCloseAuthModal={props.openOrCloseAuthModal}
      onChangeHandler={onChangeHandler}
      login={login}
      showAuthorizeForm={showAuthorizeForm}
      authorize={authorize}
      authFormData={authFormData}
    />
  );
};

export default AuthModal;
