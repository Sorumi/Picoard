import React, {Component} from 'react'
import {connect} from 'react-redux'

import About from '../components/About/About';


class AboutPage extends Component {

  componentWillMount() {

  }

  render() {
    return (
      <div>
       <About/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)

