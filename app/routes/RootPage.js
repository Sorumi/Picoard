import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

import {push} from 'react-router-redux'

class RootPage extends Component {

  componentWillMount() {
    const {handlePushRoute, handleInitMain} = this.props;

    ipcRenderer.on('main', function () {
      handleInitMain();
      handlePushRoute('/main/images');
    });

    ipcRenderer.on('about', function () {
      handlePushRoute('/about');
    });

  }

  render() {
    const {children} = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handlePushRoute: (route) => {
      dispatch(push(route));
    },
    handleInitMain: () => {
      dispatch({
        type: 'init'
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootPage)

