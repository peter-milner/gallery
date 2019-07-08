import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import 'bulma/css/bulma.min.css'

import Base from './components/base'

const client = new ApolloClient()

const App = () => (
  <ApolloProvider client={client}>
    <Base />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('content'))
