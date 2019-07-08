import React from 'react'
import { shallow } from 'enzyme'

import Gallery, { rowMapping } from '../components/gallery'
import Modal from '../components/modal'

const defaultProps = {
  photos: [
    {
      aspectRatio: 1,
      url: 'test.url',
      name: 'test',
      artist: 'test-artist'
    }
  ],
  onLoadMore: jest.fn(),
  loading: false,
  page: 1
}

const renderGallery = (props) => {
  const newProps = Object.assign({}, defaultProps, props)
  return shallow(<Gallery {...newProps} />)
}

describe('<Gallery />', () => {
  test('Snapshot', () => {
    const renderedGallery = renderGallery()
    expect(renderedGallery).toMatchSnapshot()
  })

  test('Window resize updates photo width and height', () => {
    const renderedGallery = renderGallery()

    const width = renderedGallery.find('.column').first().props().style.width
    const height = renderedGallery.find('img').first().props().style.height

    window.innerWidth = 2000
    window.innerHeight = 3000
    global.dispatchEvent(new Event('resize'))

    renderedGallery.update()

    const rowHeight = window.innerHeight / rowMapping(window.innerWidth)

    const updatedWidth = renderedGallery.find('.column').first().props().style.width
    const updatedHeight = renderedGallery.find('img').first().props().style.height

    expect(width).not.toEqual(updatedWidth)
    expect(updatedWidth).toEqual(defaultProps.photos[0].aspectRatio * rowHeight)
    expect(height).not.toEqual(updatedHeight)
    expect(updatedHeight).toEqual(rowHeight)
  })

  test('Window scroll should call to load more photos when near bottom', () => {
    const spy = jest.spyOn(defaultProps, 'onLoadMore')
    jest.spyOn(document.body, 'offsetHeight', 'get').mockImplementation(() => 3410)
    window.innerHeight = 400
    window.scrollY = 9

    global.dispatchEvent(new Event('scroll'))
    expect(spy).not.toHaveBeenCalled()

    window.scrollY += 1

    global.dispatchEvent(new Event('scroll'))
    expect(spy).toHaveBeenCalled()
  })

  test('Window scroll should not call if already loading', () => {
    const props = { loading: true, onLoadMore: jest.fn() }
    renderGallery(props)
    const spy = jest.spyOn(props, 'onLoadMore')

    jest.spyOn(document.body, 'offsetHeight', 'get').mockImplementation(() => 3410)
    window.innerHeight = 400
    window.scrollY = 10

    global.dispatchEvent(new Event('scroll'))
    expect(spy).not.toHaveBeenCalled()
  })

  test('Modal has chosen photo when photo is clicked', () => {
    const renderedGallery = renderGallery()

    renderedGallery.find('a').first().simulate('click')
    expect(renderedGallery.find(Modal).props().photo).toEqual(defaultProps.photos[0])
  })

  test('Modal has no chosen photo when closed', () => {
    const renderedGallery = renderGallery()

    renderedGallery.find('a').first().simulate('click')
    expect(renderedGallery.find(Modal).props().photo).toEqual(defaultProps.photos[0])
    renderedGallery.find(Modal).props().closeModal()
    expect(renderedGallery.find(Modal).props().photo).toEqual(null)
  })
})
