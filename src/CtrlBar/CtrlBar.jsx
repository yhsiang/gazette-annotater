import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './CtrlBar.css'

class CtrlBar extends React.Component {
  constructor(props) { super(props)
    this.state = { }
  }

  render() {
    var {question_start, question_end} = this.props;

    return (
      <div className="CtrlBar">
        <div className="CtrlBar-wrapper">
          <div className="CtrlBar-menu">
            <a href={`#${question_start + 1}`}>前往質詢開始</a>
            <span> {question_start + 1} </span>
            <a href={`#${question_end + 1 }`}>前往質詢結束</a>
            <span> {question_end + 1} </span>
          </div>
        </div>
      </div>
    )
  }
}

CtrlBar.displayName = 'CtrlBar'

export default Transmit.createContainer(CtrlBar, {

});
