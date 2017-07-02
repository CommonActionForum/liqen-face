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
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease,
              visibility 0.5s;
  top: 0;
  right: 0;
  position: absolute;
  margin-top: 10px;
`

export default class CallToAction extends React.Component {
  constructor (props) {
    super(props)
    this.state = {showPopup: false}
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

  handleMouseOver () {
    this.setState({showPopup: true})
  }

  handleMouseOut () {
    this.setState({showPopup: false})
  }

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
        <BarContainer onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <div className='progress mr-3' style={{width: '130px', height: '10px'}}>
            <ProgressBar completed={completed} total={total} />
          </div>
          <button className='btn btn-primary'>
            Create a Liqen
          </button>
        </BarContainer>
        <PopupContainer>
          <Popup visible={this.state.showPopup}>
            <div className='card'>
              <div className='card-block'>
                <div className='card-text'>Create annotations with the following tags before creating a Liqen</div>
              </div>
              <div className='list-group list-group-flush'>
                {
                  this.props.answer.map(a => (
                    <div className='list-group-item'>
                      <div className='mr-auto'>
                        <span>{a.tag + ' '}</span>
                        {a.required && <em>(required)</em>}
                      </div>
                      <div>
                        {
                          a.annotations > 0
                          ? <i
                              className='fa fa-check-circle'
                              aria-hidden={true}
                            />
                          : <i
                              className='fa fa-circle-o'
                              aria-hidden={true}
                            />
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </Popup>
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
