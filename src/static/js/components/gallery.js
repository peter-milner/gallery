import React, { useState } from 'react'
import PropTypes from 'prop-types'

export function rowMapping (width) {
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
    const [page, setPage] = useState(1)
    const [height, setHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth)

    window.onresize = () => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    }

    window.onscroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            props.onLoadMore(page+1)
            setPage(page+1)
        }
    }

    const rowHeight = height/(rowMapping(width))

    return (
        <div id='gallery' className='columns is-multiline is-mobile'>
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
                            <img src={photo.url} style={{height: rowHeight}}/>
                        </figure>
                    </div>
                )
            })}
        </div>
    )
}

Gallery.propTypes = {
    photos: PropTypes.array,
}
