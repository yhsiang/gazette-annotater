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
          <p>移動滑鼠到你心儀的那一行，按下滑鼠左鍵，就期待著有什麼事情會發生。</p>
          <Editor
            meta={doc.meta}
            value={doc.raw} />
        </div>
      </div>
    )
  }
}

App.displayName = 'App'

export default Transmit.createContainer(App, {

});
