import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './App.css'
import Editor from '../Editor/Editor.jsx'

import doc from './data/doc'

class App extends React.Component {
  constructor(props) { super(props)
    this.state = { }
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">立院公報註記小幫手</div>
        <div className="App-body">
          <p>請先點選行號，並且選擇標記。</p>
          <Editor
            info_start={2}
            info_end={9}
            record_start={15}
            record_end={69}
            report_start={77}
            report_end={318}
            question_start={320}
            question_end={1534}
            paper_start={1536}
            paper_end={1564}
            proposal_start={1566}
            proposal_end={1628}
            value={doc.raw} />
        </div>
      </div>
    )
  }
}

App.displayName = 'App'

export default Transmit.createContainer(App, {

});
