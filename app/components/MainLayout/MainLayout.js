import React, {Component} from 'react';
import {Modal} from 'antd';
import Header from './Header';

import styles from './MainLayout.css';

// function MainLayout({children}) {

class MainLayout extends Component {

  shouldComponentUpdate(props) {
    const {warning} = props;
    if (warning) {
     this.warning();
    }
    return true;
  }

  warning = () => {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  };

  render() {
    const {children} = this.props;

    return (
      <div className={styles.layout}>
        <Header className={styles.header}/>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    );
  }
}

export default MainLayout;
