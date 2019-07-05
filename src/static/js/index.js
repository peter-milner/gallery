import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.min.css'

import Base from './components/base'

const props = JSON.parse(document.getElementById('content').getAttribute('props'))

ReactDOM.render(<Base {...props} />, document.getElementById('content'))
