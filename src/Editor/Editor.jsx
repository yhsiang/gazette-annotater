import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './Editor.css'

import Modal from '../Modal/Modal.jsx'
import CtrlBar from '../CtrlBar/CtrlBar.jsx'

class Editor extends React.Component {
  constructor(props) { super(props)
    var question_start = props.meta.map((it)=>{
      return it.start_at;
    });
    var question_end = props.meta.map((it)=>{
      return it.end_at;
    });

    this.state = {
      show_modal: false,
      questions: props.meta.length,
      question_start, question_end,
      chosen_line: null,
      fold_on: true,
      fold_on_question: true
    }
  }
  handleMark(type, section) {
    var {question_start, question_end} = this.state;
    switch(type) {
      case 'question_start':
        question_start[section] = this.state.chosen_line + 1;
        break;
      case 'question_end':
        question_end[section] = this.state.chosen_line + 1;
        break;
    }
    this.setState({
      show_modal: !this.state.show_modal,
      question_start, question_end,
      chosen_line: null
    });
  }
  handleClick(index) {
    this.setState({
      show_modal: !this.state.show_modal,
      chosen_line: index
    });
  }
  handleFold(value) {
    this.setState({
      fold_on: value
    })
  }
  handleFoldQuestion(value) {
    this.setState({
      fold_on_question: value
    })
  }
  mergeRange() {
    var {questions, question_start, question_end} = this.state;
    var result = [];
    for(var i = 0; i< questions; i++) {
      result.push(question_start[i]);
      result.push(question_end[i]);
    }
    return result;
  }
  render() {

    var { questions, question_start, question_end, fold_on, fold_on_question } = this.state;
    var pt = 0, start_at = question_start[pt], end_at = question_end[pt];
    var Lines = this.props.value.split('\n').map((line, index) => {
      var classNames = 'Editor-line';
      // 選出質詢範圍
      if( index+1 >= start_at && index+ 1 <= end_at) {
        classNames += '--gainsboro';
      }
      // 折疊質詢前文字
      if(fold_on) {
        if(index === start_at - 10) {
          return (
            <div className="Editor-line"  style={{height: 16+'px'}}
             key={index}
             onClick={this.handleFold.bind(this, false)}>
             { '...（展開內文）...' }
            </div>
          );
        }
        if(pt === 0 && index < start_at - 5) return null;
        if( pt > 0 && index > question_end[0] + 5  && index < start_at - 5) return null;
      }
      // 處理折疊質詢
      if(fold_on_question) {
        if(index === start_at + 20) {
          return (
            <div className={classNames}  style={{height: 16+'px'}}
             key={index}
             onClick={this.handleFoldQuestion.bind(this, false)}>
             { '...（展開質詢內文）...' }
            </div>
          );
        } else if(index + 1 > start_at + 10 && index + 1 < end_at - 10) return null;
      }
      // 轉成下一段質詢
      if(index + 1 === end_at) {
        pt += 1;
        start_at = question_start[pt];
        end_at = question_end[pt];
      }
      return (
        <div className={classNames}  style={{height: 16+'px'}}
             key={index}
             onClick={(line.match(/^\s+$/) || line === '') ? null : this.handleClick.bind(this, index)}>
          {line}
        </div>
      );
    });
    pt = 0, start_at = question_start[pt], end_at = question_end[pt];
    var Cells = Array.apply(null, new Array(Lines.length)).map((cell, index) => {
      // 折疊質詢前文字
      if(fold_on) {
        if(index === start_at - 10) {
          return (
            <div className="Editor-cell"  style={{height: 16+'px'}}
             key={index}
             onClick={this.handleFold.bind(this, false)}>
             { '>' }
            </div>
          );
        }
        if(pt === 0 && index < start_at - 5) return null;
        if( pt > 0 && index > question_end[0] + 5  && index < start_at - 5) return null;
      }
      // 處理折疊質詢
      if(fold_on_question) {
        if(index === start_at + 20) {
          return (
            <div className="Editor-cell"  style={{height: 16+'px'}}
             key={index}
             onClick={this.handleFoldQuestion.bind(this, false)}>
             { '>' }
            </div>
          );
        } else if(index + 1 > start_at + 10 && index + 1 < end_at - 10) return null;
      }
      // 轉成下一段質詢
      if(index + 1 === end_at) {
        pt += 1;
        start_at = question_start[pt];
        end_at = question_end[pt];
      }
      return (
        <a href={`#${index+1}`} key={index} >
          <div
            className="Editor-cell"
            id={`${index + 1}`}
            style={{height: 16+'px'}}
            onClick={ ( this.props.value.split('\n')[index].match(/^\s+$/) || this.props.value.split('\n')[index] === '') ? null : this.handleClick.bind(this, index)}>
            {index + 1}
          </div>
        </a>
      );
    });

    // 計算整個高度
    var height = 16 * (Lines.length - 1) + 9;
    if(fold_on)  height -= 16 * question_start[0];
    var questions_height = 0;
    if(fold_on_question) {
      for(var i = 0; i< questions; i++) {  questions_height += question_end[i] - question_start[i]; }
      height -= 16 * (questions_height - 45) ;
    }

    return (
      <div>
        <pre className="Editor Editor--tm" style={{height: height + 'px'}}>
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
                height: height + 100 + 'px',
                marginLeft: 15+ 'px'
            }}>
              <div className="Editor-layer Editor-text">
                {Lines}
              </div>
            </div>
          </div>

        </pre>
        { this.state.show_modal? (<Modal
          handleQuestionStart={this.handleMark.bind(this)}
          handleQuestionEnd={this.handleMark.bind(this)}
          handleModal={this.handleClick.bind(this)}
          questions={questions} />) : null }
        <CtrlBar ranges={this.mergeRange()}
                 toggleFold={this.handleFold.bind(this, !fold_on)}
                 foldOn={fold_on}
                 toggleFoldQuestion={this.handleFoldQuestion.bind(this,!fold_on_question)}
                 foldOnQuestion={fold_on_question} />
      </div>
    )
  }
}

Editor.displayName = 'Editor'

export default Transmit.createContainer(Editor, {

});
