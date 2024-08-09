import { Alert, Container } from '@mui/material'
import PropTypes from 'prop-types'

let style = { 
  position: 'fixed', 
  width: '100%',
  top: '0px',
  left: '0',
  zIndex: '100'
}
const Notification = ({ message, type }) => {
  if (message === null) return null
  if (type==='red') {
    return (
      <Container maxWidth='sm'>
        <Alert style={style} severity='error'>
          {message}
        </Alert>
      </Container>
    )
  } else {
    return <Alert style={style} severity='success'>{message}</Alert>
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default Notification