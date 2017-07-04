/**
 * Created by Sorumi on 17/6/28.
 */
import React, {Component} from 'react';

import styles from './ContentLayout.css';

class ContentLayout extends Component {
  render() {

    const {top, children, onContentScroll} = this.props;

    return (
      <div className={styles.layout}>
        <div className={styles.top}>
          {top}
        </div>
        <div className={styles.main}
             ref="content"
             onScroll={() => {
               const {offsetHeight, scrollTop, scrollHeight} = this.refs.content;
               const height = {
                 offsetHeight,
                 scrollHeight,
                 scrollTop,
               };
               if (onContentScroll) {
                 onContentScroll(height);
               }
             }}>
          {children}
        </div>
      </div>
    );
  }
}

export default ContentLayout;
