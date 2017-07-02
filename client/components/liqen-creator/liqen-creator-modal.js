import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children, show }) => (
  <div>
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      style={{display: show ? 'block' : 'none'}}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          {children}
        </div>
      </div>
    </div>
    <div
      className={`modal-backdrop fade ${show ? 'show' : ''}`}
    />
  </div>
)

export default class LiqenCreatorModal extends React.Component {
  render () {
    return (
      <Modal show>
        <div className='modal-header'>
          <h5 className='modal-title'>Create a Liqen</h5>
          <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className='modal-body'>
          Choose annotations to be part of your answer
        </div>
        <ul className='list-group list-group-flush'>
          {
            this.props.answer.map(
              a => (
                <li className='list-group-item d-block'>
                  <div className='d-flex'>
                    <div className='mr-auto'>{a.tag}</div>
                    <div>
                      <i className='fa fa-angle-down' aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <div className='form-check'>
                      <label className='form-check-label'>
                        <input className='form-check-input' type='checkbox' />
                        <span> Lorem ipsum</span>
                      </label>
                    </div>
                    <div className='form-check'>
                      <label className='form-check-label'>
                        <input className='form-check-input' type='checkbox' />
                        <span> Lorem ipsum</span>
                      </label>
                    </div>
                  </div>
                </li>
              )
            )
          }
        </ul>
        <div className='modal-footer'>
          <button type='button' className='btn btn-primary'>
            Send Liqen
          </button>
        </div>
      </Modal>
    )
  }
}

LiqenCreatorModal.propTypes = {
  answer: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string,
      annotations: PropTypes.arrayOf(
        PropTypes.shape({
          ref: PropTypes.string,
          fragment: PropTypes.string // ,
          /*
          target: PropTypes.shape({
            prefix: PropTypes.string.isRequired,
            exact: PropTypes.string.isRequired,
            suffix: PropTypes.string.isRequired
          })
          */
        })
      )
    })
  ),
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}
