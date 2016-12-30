import React from 'react'
import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout'
import './HomeView.scss'
import AceEditor from 'react-ace'

var sharedb = require('sharedb/lib/client')
var StringBinding = require('sharedb-string-binding')

export class HomeView extends React.Component {
  constructor (props) {
    super(props)

    this.socket = new WebSocket('ws://' + window.location.host)
    this.connection = new sharedb.Connection(this.socket)
    this.doc = this.connection.get('configs', 'localhost')

    this.onChange = this.onChange.bind(this)
  }

  onChange () {
    console.log(`You have typed in ${this.refs.code.editor.container.firstChild.value}`)
    // Create local Doc instance mapped to 'examples' collection document with id 'textarea'
  }

  componentDidUpdate () {
    this.doc.subscribe(function (err) {
      if (err) throw err
      var element = this.refs.code.editor.container.firstChild
      var binding = new StringBinding(element, doc)
      binding.setup()
    })
  }

  render () {
    return (
        <LayoutContainer>
          <LayoutRow>
          <h4>Edit Config on this Host</h4>
          <AceEditor
            ref='code'
            onChange={this.onChange}
            width='850px'
            name='editor'
            editorProps={{ $blockScrolling: true }} />
          </LayoutRow>
        </LayoutContainer>
    )
  }
}

export default HomeView
