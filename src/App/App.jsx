import React from 'react'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'

import './App.css'
import Editor from '../Editor/Editor.jsx'

class App extends React.Component {
  constructor(props) { super(props)
    this.state = { }
  }
  componentWillMount() {
    var sessionId = localStorage.getItem("id")
    this.props.setQueryParams({ id: sessionId });
    this.setState({ id: sessionId });

  }
  handleNext() {
    var sessionId = Math.floor(Math.random() * 780) + 1;
    localStorage.setItem("id", sessionId);
    this.props.setQueryParams({ id: sessionId });
  }
  render() {
    var {doc} = this.props;
    var {id} = this.state;
    return (
      <div className="App">
        <div className="App-title">立院公報註記小幫手</div>
        <div className="App-body">
          <p>移動滑鼠到你心儀的那一行，按下滑鼠左鍵，就期待著有什麼事情會發生。</p>
          <div className="App-id">編號：{id}</div>
          <Editor
            meta={doc.meta}
            lines={doc.raw.split('\n') }
            handleNext={this.handleNext.bind(this)} />
        </div>
      </div>
    );
  }
}

App.displayName = 'App'

export default Transmit.createContainer(App, {
  queries: {
    doc({id}) {
      if (!id) {
        id = Math.floor(Math.random() * 780) + 1
        localStorage.setItem("id", id);

      }
      return request.get(`https://gapi.musou.tw/${id}`).then((res) => res.body.data).catch(()=>{ return {meta:[], raw:""};})
    }
  }
});
