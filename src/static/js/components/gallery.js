import React from 'react'
import PropTypes from 'prop-types'

export default function Gallery (props) {
    console.log(window.innerWidth)
    return (
        <div className='columns is-multiline'>
            {props.photos.map((photo, index) => {
                // TODO: Use viewport instead of magic number
                const height = 264
                const ratio = photo.width/photo.height
                const width = (ratio * height)
                return (
                    <div key={index} className='column is-narrow' style={{width: width, flexGrow: 1}}>
                        <figure className='image' >
                            <img src={photo.url} style={{height: height}}/>
                        </figure>
                    </div>
                )
            })}
        </div>
    )
}

Gallery.propTypes = {
    photos: PropTypes.array
}