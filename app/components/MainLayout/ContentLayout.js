/**
 * Created by Sorumi on 17/6/28.
 */
import React, {Component} from 'react';

import styles from './ContentLayout.css';

class ContentLayout extends Component {

  componentDidMount() {
    const {bothScroll, onContentPinch} = this.props;

    const content = this.refs.content;
    content.addEventListener('mousewheel', function (e) {
      if (e.ctrlKey) {
        onContentPinch(e.deltaY);
      } else if (bothScroll) {
        content.scrollLeft += e.deltaX;
        content.scrollTop += e.deltaY;
      }
    });
  }

  handleContentScroll = () => {
    const {offsetHeight, scrollTop, scrollLeft, scrollHeight} = this.refs.content;
    const {onContentScroll} = this.props;

    const data = {
      offsetHeight,
      scrollHeight,
      scrollTop,
      scrollLeft,
    };
    if (onContentScroll) {
      onContentScroll(data);
    }
  };

  render() {

    const {top, children, hideX, isScroll} = this.props;

    let mainClassName = styles.main;
    mainClassName = hideX ? mainClassName + ' ' + styles.hide_x : mainClassName;
    return (
      <div className={styles.layout}>
        <div className={styles.top}>
          {top}
        </div>
        <div className={mainClassName}
             ref="content"
             onScroll={this.handleContentScroll}>
          <div className={styles.content_wrapper}
            style={{marginRight: isScroll ? -10 : 0}}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default ContentLayout;
