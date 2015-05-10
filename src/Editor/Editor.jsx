import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './Editor.css'

import Modal from '../Modal/Modal.jsx'
import CtrlBar from '../CtrlBar/CtrlBar.jsx'

class Editor extends React.Component {
  constructor(props) { super(props)
    var { question_start, question_end } = props;
    this.state = {
      showModal: false,
      question_start, question_end,
      chosenLine: null
    }
  }
  handleMark(type) {
    switch(type) {
      case 'question_start':
        this.setState({ question_start: this.state.chosenLine });
        break;
      case 'question_end':
        this.setState({ question_end: this.state.chosenLine });
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
    var { question_start, question_end } = this.state;
    var Lines = this.props.value.split('\n').map((line, lineNo)=> {
      var classNames = 'Editor-line';
      if(lineNo >= question_start && lineNo <= question_end) {
        classNames += '--gainsboro';
      }

      return (
        <div className={classNames}  style={{height: 16+'px'}}
             key={lineNo}
             onClick={this.handleClick.bind(this,lineNo)}>
          {line}
        </div>
      );
    });
    var Cells = Array.apply(null, new Array(Lines.length)).map((cell, index)=> {
      return (
        <a href={`#${index+1}`} key={index} >
          <div className="Editor-cell" id={`${index + 1}`} onClick={this.handleClick.bind(this, index)}>
            {index + 1}
          </div>
        </a>
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
                marginTop: 0 +'px',
                width: 848+'px',
                height: 26189+'px',
                marginLeft: 15+ 'px'
            }}>
              <div className="Editor-layer Editor-text">
                {Lines}
              </div>
            </div>
          </div>

        </pre>
        { this.state.showModal? (<Modal
          handleQuestionStart={this.handleMark.bind(this, "question_start")}
          handleQuestionEnd={this.handleMark.bind(this, "question_end")}
          handleModal={this.handleClick.bind(this)} />) : null }
        <CtrlBar question_start={question_start} question_end={question_end} />
      </div>
    )
  }
}

Editor.displayName = 'Editor'

export default Transmit.createContainer(Editor, {

});
