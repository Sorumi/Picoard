import React, {Component} from 'react';
import Header from './Header';

import styles from './MainLayout.css';

function MainLayout({children}) {

// class MainLayout extends Component {

  // render() {
  //   const {children} = this.props;

  return (
    <div className={styles.layout}>
      <Header className={styles.header}/>
      <div className={styles.main}>
        {children}
      </div>

    </div>
  );
  // }
}

export default MainLayout;
