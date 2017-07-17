import React, {Component, cloneElement} from 'react';
import {connect} from 'react-redux'
import Draggable from 'react-draggable';

import {TITLE_BAR_HEIGHT} from '../../constants';

import styles from './SideLayout.css';

class SideLayout extends Component {

  constructor() {
    super();
    this.state = {
      drop: false,
    }
  }

  componentWillMount() {
    const self = this;
    const {handleChangeDrop} = this.props;

    window.ondragenter = function (e) {
      e.preventDefault();

      console.log('start');
    };

    window.ondragover = function (e) {
      e.preventDefault();

      console.log('over');
      e.dataTransfer.dropEffect = 'copy';

      handleChangeDrop(true);
      return false;
    };

    window.ondrop = function (e) {
      e.preventDefault();

      console.log('hover');
      handleChangeDrop(false);

      self.handleFileDrop(e);
      return false;
    };

    window.ondragleave = function (e) {
      e.preventDefault();

      console.log('leave');
      handleChangeDrop(false);

      return false;
    };
  }

  handleFileDrop = (event) => {
    const {sidebarWidth, offsetX} = this.props;

    const sidebar = sidebarWidth + offsetX;

    const x = event.clientX;
    // const y = event.clientY-TITLE_BAR_HEIGHT;
    const files = event.dataTransfer.files;

    if (x <= sidebar) {
      this.props.handleDropDirectories(files);
    } else {
      this.props.handleDropImages(files);
    }

  };

  handleStart = (event, data) => {
    // console.log('Start');
  };

  handleDrag = (event, data) => {
    const {changeOffsetX, bounds} = this.props;
    let x = data.x;
    if (x < bounds.left) {
      x = bounds.left;
    } else if (x > bounds.right) {
      x = bounds.right;
    }
    changeOffsetX(x);
  };

  handleStop = (event, data) => {
    // console.log('Stop', data.x);
  };

  render() {
    const {sidebar, sidebarWidth, offsetX, bounds, children} = this.props;


    return (
      <div className={styles.layout}>

        <div
          className={styles.sidebar}
          style={{width: sidebarWidth + offsetX}}
        >
          {sidebar}
        </div>

        <div className={styles.main}
             style={{marginLeft: sidebarWidth + offsetX}}
        >
          {children}
        </div>

        <Draggable
          axis="x"
          bounds={{left: bounds.left, right: bounds.right}}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
        >
          <div
            className={styles.line}
            style={{marginLeft: sidebarWidth - 5}}>
          </div>
        </Draggable>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {size, sidebarWidth, offsetX, bounds, drop} = state.window;
  return {
    size,
    sidebarWidth,
    offsetX,
    bounds,
    drop
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
    handleChangeDrop: (drop) => {
      dispatch({
        type: 'window/saveDrop',
        payload: drop
      })
    },

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SideLayout);
