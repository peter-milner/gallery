import React from 'react'
import { shallow } from 'enzyme'

import Modal from '../components/modal'

const defaultProps = {
  photo: {
    url: 'test.url',
    name: 'test',
    artist: 'test-artist'
  },
  closeModal: jest.fn()
}

const renderModal = (props) => {
  const newProps = Object.assign({}, defaultProps, props)
  return shallow(<Modal {...newProps} />)
}

describe('<Modal />', () => {
  test('Snapshot', () => {
    const renderedModal = renderModal()
    expect(renderedModal).toMatchSnapshot()
  })

  test('return null if photo is null', () => {
    let renderedModal = renderModal()
    expect(renderedModal.isEmptyRender()).toEqual(false)

    renderedModal = renderModal({ photo: null })
    expect(renderedModal.isEmptyRender()).toEqual(true)
  })

  test('clicking x will call closeModal', () => {
    const props = { closeModal: jest.fn() }
    const spy = jest.spyOn(props, 'closeModal')
    const renderedModal = renderModal(props)

    renderedModal.find('.modal-close').simulate('click')
    expect(spy).toHaveBeenCalled()
  })
})
