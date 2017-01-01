import React from 'react'
import { HomeView } from 'routes/Home/components/HomeView'
import { render, shallow } from 'enzyme'
import AceEditor from 'react-ace'

describe('(View) Home', () => {
  let _component

  beforeEach(() => {
    _component = render(<HomeView />)
  })

  it('Renders a welcome message', () => {
    const welcome = _component.find('h4')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/Edit Config on this Host/)
  })

  it('Renders an AceEditor component', () => {
    const wrapper = shallow(<HomeView />)
    expect(wrapper.find(AceEditor)).to.exist
  })
})
