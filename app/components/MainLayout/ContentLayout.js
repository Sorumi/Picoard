/**
 * Created by Sorumi on 17/6/28.
 */
import React, {Component} from 'react';

import styles from './ContentLayout.css';

class ContentLayout extends Component {

  render() {

    const {top, children, onContentScroll, hideX, isScroll} = this.props;

    let mainClassName = styles.main;
    mainClassName = hideX ? mainClassName + ' ' +  styles.hide_x : mainClassName;
    return (
      <div className={styles.layout}>
        <div className={styles.top}>
          {top}
        </div>
        <div className={mainClassName}
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
          <div
            style={{marginRight: isScroll ? -10 : 0}}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default ContentLayout;
