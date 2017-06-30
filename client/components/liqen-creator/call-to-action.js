import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Popup = styled.div`
  display: none;
  position: absolute;
`

export default class CallToAction extends React.Component {
  render () {
    return (
      <div>
        <Container>
          <div className='progress mr-2' style={{width: '130px', height: '10px'}}>
            <div className='progress-bar' />
          </div>
          <button className='btn btn-primary'>
            Create a Liqen
        </button>
        </Container>
        <Popup>Popup with explanation</Popup>
      </div>
    )
  }
}

CallToAction.propTypes = {
  answer: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string,
      required: PropTypes.bool,
      annotations: PropTypes.number
    })
  )
}
