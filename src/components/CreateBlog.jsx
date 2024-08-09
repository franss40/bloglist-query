import { useState, useContext } from 'react'
import { BlogsContext } from "./../contexts/BlogContext"
import { UsersContext } from "../contexts/UserContext"
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { user } = useContext(UsersContext)
  const { result, dispatch, notification } = useContext(BlogsContext)
  
  const token = user !== null ? user.token : null

  const newBlog = (event) => {
    event.preventDefault()
    if (title && author && url) {
      const newUrl = 'http://' + url
      dispatch({
        type: 'ADD',
        payload: { token, user, author, title, url: newUrl },
      })
    }
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={newBlog}>
        <div>
          <TextField
            id='title'
            label='title'
            variant='standard'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id='author'
            label='author'
            variant='standard'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <TextField
            id='url'
            label='url'
            variant='standard'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant='contained' type='submit' endIcon={<SendIcon />}>
            create
          </Button>
        </div>
        <br />
      </form>
    </>
  )
}

export default CreateBlog
