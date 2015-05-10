import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import Editor from '../Editor/Editor.jsx'

import doc from './data/doc'

class App extends React.Component {
  constructor(props) { super(props)
    this.state = { }
  }
  render() {
    return (
      <div className="App">
        {'立院公報註記小幫手'}
        <Editor
          info_start={2}
          info_end={9}
          question_start={320}
          question_end={1534}
          value={doc.raw} />
      </div>
    )
  }
}


export default Transmit.createContainer(App, {

});
