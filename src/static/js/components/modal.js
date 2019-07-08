import React from 'react'
import PropTypes from 'prop-types'

export default function Modal (props) {
  return props.photo ? (
    <div className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <section className='modal-content'>
          <p className='image'>
            <img src={props.photo.url} />
          </p>
        </section>
        <footer
          className='modal-card-foot'
          style={{
            display: 'block',
            overflowY: 'auto',
            maxHeight: '25%'
          }}
        >
          <h1 className='title'>{props.photo.name}</h1>
          <h1 className='subtitle is-4'>By {props.photo.artist}</h1>
          <h2 className='subtitle'>{props.photo.description}</h2>
        </footer>
      </div>
      <button className='modal-close is-large' aria-label='close' onClick={props.closeModal}></button>
    </div>
  ) : null
}

Modal.propTypes = {
  photo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  closeModal: PropTypes.func.isRequired
}
