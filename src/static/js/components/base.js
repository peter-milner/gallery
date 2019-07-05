import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export const query = gql`
    query ($page: Int!) {
        photos(page: $page) {
            currentPage
            totalPages
            photos {
                url
            }
        }
    }
`

export default function Base () {
    const [page, setPage] = useState(1)

    return (
        <Query
            query={query}
            variables={{page: page}}
        >
            {({ data }) => {
                console.log(data)
                return (
                    <div className='container'>
                        <h1 className='title'>What's popular today</h1>
                    </div>
                )
            }}
        </Query>
    )  
}
