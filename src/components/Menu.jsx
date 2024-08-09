import { Link, Route, Routes } from "react-router-dom"
import App from "../App"
import { useContext } from "react"
import { NotisContext } from "../contexts/NotiContext"
import { UsersContext } from "../contexts/UserContext"
import Notification from "./Notification"
import LoginForm from "./LoginForm"
import User from './User'
import BlogSingle from "./BlogSingle"
import { Box, Button, Container, Divider, Stack } from '@mui/material'
import '@fontsource/roboto/'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import PersonIcon from '@mui/icons-material/Person'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 16,
  },
})

const Menu = () => {
  const { user, handleLogin, handleLogout } = useContext(UsersContext)
  const { notification } = useContext(NotisContext)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Notification
          message={notification.content}
          type={notification.color}
        />
        <Box sx={{ width: '100%', marginTop: '10vh', paddingLeft: '10vw' }}>
          <Stack
            direction='row'
            spacing={2}
            divider={<Divider orientation='vertical' flexItem />}
            justifyContent='end'
          >
            <p>
              <Link
                to='/blogs'
                style={{ color: 'blue', textDecoration: 'none' }}
              >
                Blogs
              </Link>
            </p>
            <p>
              <Link
                to='/users'
                style={{ color: 'blue', textDecoration: 'none' }}
              >
                Users
              </Link>
            </p>

            {user !== null && (
              <p>
                <em>{user.name} logged-in </em>
                &nbsp;&nbsp;&nbsp;
                <Button variant='contained' size='small' onClick={handleLogout} startIcon={<PersonIcon />}>
                  logout
                </Button>
              </p>
            )}
          </Stack>
        </Box>
        {user === null && (
          <div>
            <LoginForm handleLogin={handleLogin} />
          </div>
        )}

        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/users' element={<User />} />
          <Route path='/blogs/:id' element={<BlogSingle />} />
          <Route path='/blogs' element={<App />} />
        </Routes>

        <br />
        <hr />
        <p>
          <b>
            <em>Blog app, 2024</em>
          </b>
        </p>
      </Container>
    </ThemeProvider>
  )
}

export default Menu