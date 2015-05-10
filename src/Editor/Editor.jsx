import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './Editor.css'

class Editor extends React.Component {
  constructor(props) { super(props)
    var {info_start, info_end, question_start, question_end, value} = props;
    this.state = {
      showModal: false,
      info_start, info_end, question_start, question_end, value,
      chosenLine: null
    }
  }
  handleModal(lineNo) {
    this.setState({
      showModal: !this.state.showModal,
      chosenLine: lineNo
    });
  }
  handleMark(type) {
    switch(type) {
      case 'question_start':
        this.setState({ question_start: this.state.chosenLine })
        break;
    }
    this.setState({
      showModal: !this.state.showModal,
      chosenLine: null
    });
  }
  render() {
    var {info_start, info_end, question_start, question_end, value} = this.state;
    var Lines = value.split('\n').map((line, lineNo)=> {
      var classNames = 'Editor-doc';
      if(lineNo >= info_start && lineNo <= info_end) {
        classNames += ' u-yellow';
      }
      if(lineNo >= question_start && lineNo <= question_end) {
        classNames += ' u-red';
      }
      return (
        <div className="Editor-line" onClick={this.handleModal.bind(this, lineNo)}>
          <span className={classNames} >{line}</span>
        </div>
      );
    });
    var Cells = Array.apply(null, new Array(Lines.length)).map((cell, index)=> {
      return (
        <div className="Editor-cell">
          {index + 1}
        </div>
      );
    });

    return (
      <div className="Editor">
        <div className="Editor-gutter">
          {Cells}
        </div>
        <div className="Editor-scoller">
          <div className="Editor-content">
            <div className="Editor-text">
              {Lines}
            </div>
          </div>
        </div>
        {
          this.state.showModal? (
            <div className="Editor-modal">
              <button onClick={this.handleMark.bind(this, "question_start")}>這是質詢開始</button>
            </div>
          ) : null
        }
      </div>
    )
  }
}


export default Transmit.createContainer(Editor, {

});
