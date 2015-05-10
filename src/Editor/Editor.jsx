import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './Editor.css'

import Modal from '../Modal/Modal.jsx'

class Editor extends React.Component {
  constructor(props) { super(props)
    var {info_start, info_end, question_start, question_end, value} = props;
    this.state = {
      showModal: false,
      info_start, info_end, question_start, question_end, value,
      chosenLine: null
    }
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
  handleClick(index) {
    this.setState({
      showModal: !this.state.showModal,
      chosenLine: index
    });
  }
  render() {
    var {info_start, info_end, question_start, question_end, value} = this.state;
    var Lines = value.split('\n').map((line, lineNo)=> {
      var classNames = 'Editor-line';
      if(lineNo >= info_start && lineNo <= info_end) {
        classNames += '--grey';
      }
      if(lineNo >= question_start && lineNo <= question_end) {
        classNames += '--green';
      }
      return (
        <div className={classNames}  style={{height: 16+'px'}}>
          {line}
        </div>
      );
    });
    var Cells = Array.apply(null, new Array(Lines.length)).map((cell, index)=> {
      return (
        <div className="Editor-cell" onClick={this.handleClick.bind(this, index)}>
          {index + 1}
        </div>
      );
    });

    return (
      <div>
        <pre className="Editor Editor--tm" style={{height: 26089 +'px'}}>
          <div className="Editor-gutter Editor-gutter--tm">
            <div className="Editor-gutterLayer Editor-layer">
              {Cells}
            </div>
          </div>
          <div className="Editor-scroller" style={{
              left: 48 + 'px',
              right: 0 + 'px',
              bottom: 0 +'px'
          }}>
            <div className="Editor-content" style={{
                "margin-top": 0 +'px',
                width: 848+'px',
                height: 26189+'px',
                "margin-left": 15+ 'px'
            }}>
              <div className="Editor-layer Editor-text">
                {Lines}
              </div>
            </div>
          </div>

        </pre>
        { this.state.showModal? (<Modal handleMark={this.handleMark.bind(this, "question_start")} handleModal={this.handleClick.bind(this)} />) : null }
      </div>
    )
  }
}


export default Transmit.createContainer(Editor, {

});
