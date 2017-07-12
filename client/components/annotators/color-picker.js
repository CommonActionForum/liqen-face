/**
 * Tooltip to select a tag
 *
 * Inputs
 * - tagList
 * - position
 * - visible
 *
 * Outputs
 * - onTag()
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const UnstyledContainer = ({ className, children, style }) => (
  <div
    className={`tooltip tooltip-bottom ${className}`}
    style={style}
  >
    {children}
  </div>
)

const UnstyledItem = ({ className, code, onClick, selected }) => (
  <button
    className={className}
    onClick={onClick}
    style={{background: code}}
  >
    <i className={`fa ${selected && 'fa-check'}`} aria-hidden='true' />
  </button>
)

const Container = styled(UnstyledContainer)`
  opacity: 1;
  position: fixed;
  transform: translateX(-50%);
`

const ListItem = styled(UnstyledItem)`
  width: 24px;
  height: 24px;
  margin: 6px 4px;
  border: none;
  box-shadow: inset 0 0 2px 0px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
`

export default function ColorPicker ({ list, onSelect, position, onClose }) {
  return (
    <Container
      style={{
        top: (position.y) + 'px',
        left: (position.x) + 'px'
      }}
    >
      <div className="tooltip-arrow"></div>
      <div className='tooltip-inner'>
        {
          list.map(({code, title, selected}) => (
            <ListItem
              key={code}
              code={code}
              onClick={() => onSelect(code)}
              selected={selected}
            >
              {title}
            </ListItem>
          ))
        }
      </div>
    </Container>
  )
}

ColorPicker.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      selected: PropTypes.bool
    })
  ),
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}
