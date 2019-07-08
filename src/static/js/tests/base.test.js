import React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from 'react-apollo/test-utils'

import Base, { query } from '../components/base'

import Gallery from '../components/gallery'

const defaultMocks = [
  {
    request: {
      query: query
    },
    result: {
      data: {
        photos: {
          currentPage: 1,
          totalPages: 2,
          photos: [
            {
              url: 'test.url',
              aspectRatio: 1.0,
              name: 'test-photo',
              description: 'test-description',
              artist: 'test-artist'
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: query,
      variables: { page: 2 }
    },
    result: {
      data: {
        photos: {
          currentPage: 1,
          totalPages: 2,
          photos: [
            {
              url: 'test.url',
              aspectRatio: 1.0,
              name: 'test-photo',
              description: 'test-description',
              artist: 'test-artist'
            }
          ]
        }
      }
    }
  }
]

const renderBase = (mocks = defaultMocks) => {
  return mount(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <Base />
    </MockedProvider>
  )
}

describe('<Base/>', () => {
  test('Snapshot', () => {
    const renderedBase = renderBase()
    expect(renderedBase).toMatchSnapshot()
  })

  test('Gallery exists after data is available', async () => {
    const renderedBase = renderBase()

    expect(renderedBase.find(Gallery).exists()).toEqual(false)

    await new Promise(resolve => setTimeout(resolve, 10))
    renderedBase.update()

    expect(renderedBase.find(Gallery).exists()).toEqual(true)
  })

  test('Can fetchMore and append more photos', async () => {
    const renderedBase = renderBase()

    await new Promise(resolve => setTimeout(resolve, 10))
    renderedBase.update()
    renderedBase.find(Gallery).props().onLoadMore(2)
    await new Promise(resolve => setTimeout(resolve, 10))
    renderedBase.update()

    expect(renderedBase.find(Gallery).props().photos.length).toEqual(2)
  })

  test('Cannot fetchMore photos if currentPage > totalPages', async () => {
    const mock = Object.assign({}, defaultMocks[0], {
      result: {
        data: {
          photos: {
            ...defaultMocks[0].result.data.photos,
            totalPages: 1
          }
        }
      }
    })
    const renderedBase = renderBase([mock, defaultMocks[1]])

    await new Promise(resolve => setTimeout(resolve, 10))
    renderedBase.update()
    renderedBase.find(Gallery).props().onLoadMore(2)
    await new Promise(resolve => setTimeout(resolve, 10))
    renderedBase.update()

    expect(renderedBase.find(Gallery).props().photos.length).toEqual(1)
  })
})
