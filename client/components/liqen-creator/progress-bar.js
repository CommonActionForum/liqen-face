import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const UnstyledBar = ({style, className}) => (
  <div className={`progress-bar ${className}`} style={style} />
)

const Bar = styled(UnstyledBar)`
  transition: width 0.5s ease
`

export default function ProgressBar ({completed, total}) {
  return (
    <Bar style={{width: `${completed / total * 100}%`}} />
  )
}

ProgressBar.propTypes = {
  completed: PropTypes.number,
  total: PropTypes.number
}
