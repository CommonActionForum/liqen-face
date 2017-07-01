import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ProgressBar from './progress-bar'

const Container = styled.div`
  position: relative;
`

const BarContainer = styled.div`
  display: flex;
  align-items: center;
`

const PopupContainer = styled.div`
  position: relative;
`

const Popup = styled.div`
  top: 0;
  right: 0;
  position: absolute;
  border: 1px solid #333;
  border-radius: 5px;
  margin-top: 10px;
  padding: 15px;
`

export default class CallToAction extends React.Component {
  render () {
    const total = this.props.answer
      .filter(a => a.required)
      .length

    const completed = this.props.answer
      .filter(a => a.required)
      .filter(a => a.annotations > 0)
      .length

    return (
      <Container>
        <BarContainer>
          <div className='progress mr-3' style={{width: '130px', height: '10px'}}>
            <ProgressBar completed={completed} total={total} />
          </div>
          <button className='btn btn-primary'>
            Create a Liqen
          </button>
        </BarContainer>
        <PopupContainer>
          <Popup>Popup with explanation</Popup>
        </PopupContainer>
      </Container>
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
