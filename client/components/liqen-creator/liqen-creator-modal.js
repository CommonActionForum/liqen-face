import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children, show }) => (
  <div className='modal-open'>
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
  constructor (props) {
    super(props)
    this.state = {
      opened: -1
    }
  }

  open (i) {
    this.setState(prevState => ({
      opened: prevState.opened === i ? -1 : i
    }))
  }

  change (ref, activate) {
    if (activate) {
      this.props.onAdd(ref)
    } else {
      this.props.onRemove(ref)
    }
  }

  render () {
    return (
      <Modal show>
        <div className='modal-header'>
          <h5 className='modal-title'>Create a Liqen</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => this.props.onCancel()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className='modal-body'>
          Choose annotations to be part of your answer
        </div>
        <ul className='list-group list-group-flush'>
          {
            this.props.answer.map((a, i) => (
              <li className='list-group-item d-block' key={i} >
                <div className='d-flex' onClick={() => this.open(i)}>
                  <div className='mr-auto'>{a.tag}</div>
                  <div>
                    <i
                      className={`fa ${i === this.state.opened ? 'fa-angle-up' : 'fa-angle-down'}`}
                      aria-hidden='true'
                    />
                  </div>
                </div>
                <div>
                  {
                    i === this.state.opened && a.annotations.map(ann => (
                      <div className='form-check' key={ann.ref}>
                        <label className='form-check-label'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={ann.active}
                            onChange={() => this.change(ann.ref, !ann.active)}
                          />
                          <span>{' ' + ann.fragment}</span>
                        </label>
                      </div>
                    ))
                  }
                </div>
              </li>
            ))
          }
        </ul>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => this.props.onSubmit()}
          >
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
          fragment: PropTypes.string,
          active: PropTypes.bool
        })
      )
    })
  ),
  visible: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}
