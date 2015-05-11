import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './Modal.css'

class Modal extends React.Component {
  constructor(props) { super(props)
    this.state = { }
  }

  render() {
    var section = 0;
    var Btns = Array.apply(null, new Array(this.props.questions * 2)).map((a, i)=> {
      if(i % 2 === 0 ) {
        section +=1;
        return (
          <a className="Btn"
          onClick={this.props.handleQuestionStart}
          style={{marginRight: 10 +'px'}}>{`第${section}段`}質詢開始</a>
        );
      } else {
        return (
          <a className="Btn"
          onClick={this.props.handleQuestionEnd}
          style={{marginTop: 10 +'px'}}>{`第${section}段`}質詢結束</a>
        );
      }
    });

    return (
      <div className="Modal" onClick={this.props.handleModal}>
        <div className="Modal-dialog">
          <div className="Modal-header">
            <h2>我要標記</h2>
            <a className="Btn-close" onClick={this.props.handleModal}>×</a>
          </div>
          <div className="Modal-body">
            {Btns}
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
