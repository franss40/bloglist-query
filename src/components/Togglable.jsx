import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import CompressIcon from '@mui/icons-material/Compress'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant='outlined'
          onClick={toggleVisibility}
          startIcon={<CompressIcon />}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant='outlined'
          onClick={toggleVisibility}
          startIcon={<CompressIcon />}
        >
          cancel
        </Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
