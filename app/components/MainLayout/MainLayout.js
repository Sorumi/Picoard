import React from 'react';

import Header from './Header';

import styles from './MainLayout.css';

function MainLayout({children}) {
  return (
    <div className={styles.layout}>
      <Header className={styles.header}/>
      <div className={styles.main}>
      {children}
      </div>
    </div>
  );
}

export default MainLayout;
