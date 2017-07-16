import React, {Component} from 'react';
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

    window.ondragenter = function (e) {
      e.preventDefault();

      console.log('start');
    };

    window.ondragover = function (e) {
      e.preventDefault();

      console.log('over');
      e.dataTransfer.dropEffect = 'copy';


      self.setState({
        drop: true,
      });
      return false;
    };

    window.ondrop = function (e) {
      e.preventDefault();

      console.log('hover');
      self.setState({
        drop: false,
      });

      self.handleFileDrop(e);

      return false;
    };

    window.ondragleave = function (e) {
      e.preventDefault();

      console.log('leave');

      self.setState({
        drop: false,
      });
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
    const {sidebar, sidebarWidth, offsetX, bounds, children, empty} = this.props;

    const {drop} = this.state;

    let sidebarClassName = styles.sidebar_wrapper;
    sidebarClassName = drop ? sidebarClassName + ' ' + styles.siderbar_drop : sidebarClassName;

    let mainClassName = styles.main_wrapper;
    mainClassName = drop ? mainClassName + ' ' + styles.main_drop : mainClassName;

    return (
      <div className={styles.layout}>

        <div
          className={sidebarClassName}
          style={{width: sidebarWidth + offsetX}}
        >
          {empty && !drop ?
            <div className={styles.hint}>
              <p>Drag directories to add</p>
            </div> : null}
          <div className={styles.sidebar}>
            {sidebar}
          </div>
          {drop ?
            <div className={styles.drop}>
            <div className={styles.drop_child}>
            <p>Drag directories to add</p>
            </div>
            </div> : null
            }

        </div>

        <div className={mainClassName}
             style={{marginLeft: sidebarWidth + offsetX}}
        >
          <div className={styles.main}>
            {children}
          </div>
          {drop ?
            <div className={styles.drop}>
              <div className={styles.drop_child}>
                <p>Drag images to copy</p>
              </div>
            </div> : null
          }
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
  const {size, sidebarWidth, offsetX, bounds} = state.window;
  return {
    size,
    sidebarWidth,
    offsetX,
    bounds
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
