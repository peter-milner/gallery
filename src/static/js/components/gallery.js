import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Modal from './modal'

export const rowMapping = (width) => {
  switch (true) {
    case (width <= 768):
      return 8
    case (width <= 1024):
      return 5
    case (width <= 1216):
      return 4
    default:
      return 3
  }
}

export default function Gallery (props) {
  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)
  const [chosenPhoto, setChosenPhoto] = useState(null)

  const rowHeight = height / (rowMapping(width))

  window.onresize = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }

  window.onscroll = () => {
    if (!props.loading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - rowHeight * 3) {
      props.onLoadMore(props.page + 1)
    }
  }

  return (
    <div id='gallery' className='columns is-multiline is-mobile'>
      <Modal
        photo={chosenPhoto}
        closeModal={() => { setChosenPhoto(null) }}
      />
      {props.photos.map((photo, index) => {
        const width = (photo.aspectRatio * rowHeight)
        return (
          <div
            key={index}
            className='column'
            style={{
              width: width,
              flexGrow: 1,
              flexBasis: 'auto'
            }}
          >
            <figure className='image'>
              <a onClick={() => { setChosenPhoto(photo) }}>
                <img src={photo.url} style={{ height: rowHeight }}/>
              </a>
            </figure>
          </div>
        )
      })}
    </div>
  )
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    aspectRatio: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
  })),
  onLoadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired
}
