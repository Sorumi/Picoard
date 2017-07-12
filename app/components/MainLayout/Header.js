import React from 'react';

import styles from './Header.css';
import logo from '../../assets/img/logo.png';

function Header({className}) {


  return (
    <div className={styles.header + ' ' + className}>
      <h3>PIC<img src={logo}/>ARD</h3>
    </div>
  );
}

export default Header;
