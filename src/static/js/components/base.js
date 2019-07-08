import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Gallery from './gallery'

export const query = gql`
    query ($page: Int) {
        photos(page: $page) {
            currentPage
            totalPages
            photos {
                url
                aspectRatio
                name
                description
                artist
            }
        }
    }
`

export default function Base () {
  return (
    <Query
      query={query}
      notifyOnNetworkStatusChange={true}
    >
      {({ data, fetchMore, loading }) => {
        return (
          <div className='container'>
            <h1 className='title'>What&apos;s popular today</h1>
            { data.photos &&
                            <Gallery
                              photos={data.photos.photos}
                              onLoadMore={(page) => {
                                if (page <= data.photos.totalPages) {
                                  fetchMore({
                                    variables: { page: page },
                                    updateQuery: (prev, { fetchMoreResult }) => {
                                      if (!fetchMoreResult) return prev
                                      const photos = Object.assign({}, fetchMoreResult.photos, {
                                        photos: [...prev.photos.photos, ...fetchMoreResult.photos.photos]
                                      })
                                      return { photos }
                                    }
                                  })
                                }
                              }}
                              loading={loading}
                              page={data.photos.currentPage}
                            />
            }
          </div>
        )
      }}
    </Query>
  )
}
