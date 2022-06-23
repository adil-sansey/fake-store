import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import AuthorizeForm from '../AuthorizeForm/AuthorizeForm';
import { useState, useEffect } from 'react';

const AuthModal = (props) => {
  const [isShowAuthorizeForm, setIsShowAuthorizeForm] = useState(false);

  const [user, setUser] = useState({
    email: { value: '', isValid: null },
    password: { value: '', isValid: null },
  });

  const [isWrongEmailOrPass, setIsWrongEmailOrPass] = useState(null);
  // {
  //   email: 'jhayklaus17@gmail.com',
  //   password: 'ahjgahhkjka',
  //   isValidData: true,
  // }

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

    setTimeout(() => {
      console.log(user);
    });
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
        return response.json();
      })
      .then((data) => {
        console.log(data);

        if (!data.isAvailable) {
          setUser({ ...user, email: { ...user.email, isValid: false } });
          setIsWrongEmailOrPass('Адрес электронной почты уже зарегестрирован!');
          return;
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
      .then()
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
          setUser({ ...user, email: { isValid: false }, password: { isValid: false } });
          setIsWrongEmailOrPass('Неверный email или пароль!');
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.access_token);

        if (!data.access_token) {
          setUser({ ...user, isValidData: false });
          return;
        }

        return fetch('https://api.escuelajs.co/api/v1/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
