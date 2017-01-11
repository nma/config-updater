import React from 'react'
//import './Editor.scss'
import AceEditor from 'react-ace'
import request from 'superagent'

// var sharedb = require('sharedb/lib/client')
// var StringBinding = require('sharedb-string-binding')

export class Editor extends React.Component {
  constructor (props) {
    super(props)

    // this.socket = new WebSocket('ws://localhost:3000/')
    // this.connection = new sharedb.Connection(this.socket)
    // this.doc = this.connection.get('configs', 'localhost')

    this.onChange = this.onChange.bind(this)
    this.onLoad = this.onLoad.bind(this)

    this.state = {
      editorBody: 'test'
    }
  }

  onLoad (editor) {
    console.log('editor has loaded!')
  }

  onChange (newValue) {
    console.log(`You have typed in ${this.refs.code.editor.container.firstChild.nodeValue}`)
    console.log(`New value is ${newValue}`)
    this.setState({ editorBody: newValue})
  }

  componentWillMount () {
    const that = this
    request.get('/files')
    .end(function (err, res) {
      if (err) throw err
      console.log('got CONFIG of ', res)
      that.setState({ editorBody: res.text })
    })
  }

  componentDidMount () {
    const that = this
    console.log('trying to mount the object')
    // this.doc.subscribe(function (err) {
    //   if (err) throw err
    //   var element = that.refs.code.editor.container.firstChild
    //   var binding = new StringBinding(element, that.doc)
    //   binding.setup()
    // })
  }

  handleButtonSaveClick () {
    request.put('/files')
    .send({ textBody: this.state.editorBody })
    .end(function(err, res) {
      if (err) throw err
      console.log('request to update config returned 200.')
    })
  }

  render () {
    return (
      <AceEditor
        ref='code'
        onChange={this.onChange}
        onLoad={this.onLoad}
        width='850px'
        name='editor'
        editorProps={{ $blockScrolling: true }}
        value={this.state.editorBody} />
    )
  }
}

export default Editor
