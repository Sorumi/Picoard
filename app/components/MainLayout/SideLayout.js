import React, {Component} from 'react';
import {connect} from 'react-redux'
import Draggable from 'react-draggable';

import styles from './SideLayout.css';

function SideLayout({changeOffsetX, sidebar, size, sidebarWidth, offsetX, children}) {

  function handleStart(event, data) {
    // console.log('Start');
  }

  function handleDrag(event, data) {
    // console.log(data.x, data.lastX, data.deltaX);
      changeOffsetX(data.x);
  }

  function handleStop(event, data) {
    // console.log('Stop', data.x);
  }

  return (
    <div className={styles.layout}>

      <div
        className={styles.sidebar}
        style={{width: sidebarWidth + offsetX}}
      >
        {sidebar}
      </div>

      <div className={styles.main}
           style={{marginLeft: sidebarWidth + offsetX}}>
          {children}
      </div>

      <Draggable
        axis="x"
        // bounds={{left: -100, right: 100}}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div
          className={styles.line}
          style={{marginLeft: sidebarWidth - 5}}>
        </div>
      </Draggable>

    </div>
  );

}

function mapStateToProps(state) {
  const {size, sidebarWidth, offsetX} = state.window;
  // const images = state.images;
  return {
    size,
    sidebarWidth,
    offsetX,
      // images
  };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeOffsetX: (x) => {
            dispatch({
                type: 'window/changeOffsetX',
                payload: x
            })
        },

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SideLayout);
