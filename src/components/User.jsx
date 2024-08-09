import { useContext, useEffect, useState } from 'react'
import users from './../services/users'
import { Link, useParams } from 'react-router-dom'
import { NotisContext } from '../contexts/NotiContext'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableHead } from '@mui/material'

const User = () => {
  const { notification, showNotification} = useContext(NotisContext)
  const [usersList, setUsersList] = useState(null)
  const id= useParams().id

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await users.getUsers()
        setUsersList(response)
      } catch (error) {
        showNotification('User data could not be loaded', 'red')
      }
    }
    fetchData()
  }, [])

  if (!usersList) {
    return null
  }

  if (id) {
    const userList = usersList.find(user => user.id === id)
    return (
      <>
        <h2>{userList.username}</h2>
        <h3>added blogs</h3>
        {userList.blogs.length ? (
          <ul>
            {userList.blogs.map((blog) => (
              <li key={blog.id}>
                <Link
                  style={{ color: 'blue', textDecoration: 'none' }}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>there is not blogs</p>
        )}
      </>
    )
  }

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Users</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Users</b>
              </TableCell>
              <TableCell>
                <b>Blogs created</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.username}>
                <TableCell>
                  <Link
                    style={{ color: 'blue', textDecoration: 'none' }}
                    to={`/users/${user.id}`}
                  >
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default User
