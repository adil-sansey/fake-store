import React from 'react';
import styles from './Label.module.css';

function Label(props) {
  return (
    <label className={styles.label} htmlFor={props.htmlFor}>
      {props.placeholder}:<span className={styles.required}> *</span>
    </label>
  );
}

export default Label;
