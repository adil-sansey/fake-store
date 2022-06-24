import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import AuthorizeForm from '../AuthorizeForm/AuthorizeForm';
import { useState, useEffect } from 'react';

const AuthModal = (props) => {
  const [isShowAuthorizeForm, setIsShowAuthorizeForm] = useState(false);

  //TODO change user state back to default!!!
  const [user, setUser] = useState({
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

    setUser({
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
        if (value === '' || value !== user.password.value) {
          isValid = false;
          break;
        }
        break;

      default:
        break;
    }

    setUser({ ...user, [id]: { value, isValid } });
  };

  const authorize = (e) => {
    e.preventDefault();

    for (let prop in user) {
      if (!user[prop].isValid) {
        return;
      }
    }

    fetch('https://api.escuelajs.co/api/v1/users/is-available', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email.value }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        if (!data.isAvailable) {
          setUser({ ...user, email: { ...user.email, isValid: false } });
          setIsWrongEmailOrPass('Адрес электронной почты уже зарегестрирован!');

          return data;
        }

        return fetch('https://api.escuelajs.co/api/v1/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name.value,
            email: user.email.value,
            password: user.password.value,
          }),
        });
      })
      .then((response) => {
        // looks like the api no longer allows to create new users
        // TODO
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = (e) => {
    e.preventDefault();

    if (!user.email.isValid) {
      setUser({ ...user, email: { ...user.email, isValid: false } });

      return;
    }

    if (!user.password.isValid) {
      setUser({ ...user, password: { ...user.password, isValid: false } });

      return;
    }

    fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email.value, password: user.password.value }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          setUser({
            email: { ...user.email, isValid: false },
            password: { ...user.password, isValid: false },
          });
          setIsWrongEmailOrPass('Неверный email или пароль!');

          return new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        if (!data.access_token) {
          console.log(data);
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
          console.log(response);
          return response;
        }

        return response.json();
      })
      .then((data) => {
        if (data instanceof Error) {
          console.log(data);
          return data;
        }

        props.setUserData(data);
        props.setIsUserLoged(true);

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
        user={user}
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
      user={user}
    />
  );
};

export default AuthModal;
