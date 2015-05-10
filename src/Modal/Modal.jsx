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
      <div className="Modal" onClick={this.props.handleModal}>
        <div className="Modal-dialog">
          <div className="Modal-header">
            <h2>我要標記</h2>
            <a className="Btn-close" onClick={this.props.handleModal}>×</a>
          </div>
          <div className="Modal-body">
            <a className="Btn" onClick={this.props.handleQuestionStart} style={{"margin-right": 10 +'px'}}>質詢開始</a>
            <a className="Btn" onClick={this.props.handleQuestionEnd}>質詢結束</a>
          </div>
          <div className="Modal-footer">
            <a className="Btn" onClick={this.props.handleModal}>取消</a>
          </div>
        </div>
      </div>
    )
  }
}

Modal.displayName = 'Modal'

export default Transmit.createContainer(Modal, {

});
