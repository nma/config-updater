import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout'
import './HomeView.scss'
import AceEditor from 'react-ace'

var sharedb = require('sharedb/lib/client')

export class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textareaValue: '',
      editorDom: null
    }

    // this.socket = new WebSocket(`ws://localhost:${port}`)
    // this.connection = new sharedb.Connection(socket)
    this.onChange = this.onChange.bind(this)
  }

  loadFile () {
    var doc = connection.get('examples', 'counter')
  }

  handleTextareaChange (value) {
    this.setState({
      textareaValue: value
    })
  }

  componentDidMount () {
  }

  onChange () {
    console.log('hello world')
  }

  render () {
    return (
      <div>
        <h4>Edit Config on this Host</h4>

         <LayoutContainer>
              <LayoutRow>
                <LayoutColumn width={1}>
                  <AceEditor
                    onChange={this.onChange}
                    name='editor'
                    editorProps={{ $blockScrolling: true }}
                  />
                </LayoutColumn>
              </LayoutRow>
        </LayoutContainer>

      </div>
    )
  }
}

export default HomeView
