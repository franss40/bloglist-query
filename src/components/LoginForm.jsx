import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const createLogin = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={createLogin}>
        <div>
          <TextField
            id='username'
            label='username'
            variant='standard'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            id='password'
            label='password'
            variant='standard'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='contained' type='submit' endIcon={<SendIcon />}>
            login
          </Button>
        </div>
      </form>
      <br />
      <hr />
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm