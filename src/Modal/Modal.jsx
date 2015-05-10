import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './Modal.css'

class Modal extends React.Component {
  constructor(props) { super(props)
    this.state = { }
  }
  render() {
    return (
      <div className="Modal">
        <div className="Modal-dialog">
          <div className="Modal-header">
            <h2>我要標記</h2>
            <a className="Btn-close" onClick={this.props.handeModal}>×</a>
          </div>
          <div className="Modal-body">
            <p>One modal example here! :D</p>
          </div>
          <div className="Modal-footer">
            <a className="Btn" onClick={this.props.handleMark}>這是質詢開始</a>
          </div>
        </div>
      </div>
    )
  }
}


export default Transmit.createContainer(Modal, {

});
