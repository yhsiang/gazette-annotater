import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './CtrlBar.css'

class CtrlBar extends React.Component {
  constructor(props) { super(props)
    this.state = { }
  }

  render() {
    var {question_start, question_end, toggleFold, foldOn, toggleFoldQuestion, foldOnQuestion } = this.props;
    var text = (foldOn) ? "展開":"折疊";
    var textQuestion = (foldOnQuestion) ? "展開質詢":"折疊質詢";
    var section = 1 ;
    var Btns = this.props.ranges.map((it, index)=> {
      var text = `第${ section }段質詢開始：`;
      if( index % 2 === 1 ) {
        text = `第${ section }段質詢結束：`;
        section += 1;
      }

      return (
        <a className="CtrlBar-btn" href={`#${it}`}>
          {text}
          <span>{it} </span>
        </a>
      );
    });
    return (
      <div className="CtrlBar">
        <div className="CtrlBar-wrapper">
          <div className="CtrlBar-menu">
            <div className="CtrlBar-btn" onClick={toggleFold}>{text}</div>
            <div className="CtrlBar-btn" onClick={toggleFoldQuestion}>{textQuestion}</div>
            {Btns}
            <div className="CtrlBar-btn" onClick={this.props.handleNext}>下一則</div>
          </div>
        </div>
      </div>
    )
  }
}

CtrlBar.displayName = 'CtrlBar'

export default Transmit.createContainer(CtrlBar, {

});
