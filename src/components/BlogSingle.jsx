import { useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BlogsContext } from "../contexts/BlogContext"
import { UsersContext } from "../contexts/UserContext"
import commentServices from './../services/comment'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { NotisContext } from "../contexts/NotiContext"
import { Button, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

const BlogSingle = () => {
  const navigate = useNavigate()
  const { user } = useContext(UsersContext)
  const { result, dispatch } = useContext(BlogsContext)
  const { notification, showNotification } = useContext(NotisContext)
  const id = useParams().id

  const token = user.token
  const blogList = result.data.find(blog => blog.id === id)

  const isCreated = blogList.user.id === user.id

  const queryClient = useQueryClient()

  const resultComments = useQuery({
    queryKey: ['comments', id],
    queryFn: () => commentServices.getComments(id),
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!result,
  })

  const newCommentMutation = useMutation({
    mutationFn: async ({ id, comment }) => {
      const response = await commentServices.createComment(id, comment)
      return response
    },
    onSuccess: (newComment) => {
      const allComment = queryClient.getQueryData(['comments', id])
      queryClient.setQueryData(['comments', id], allComment.concat(newComment))
      showNotification('comment added', 'green')
    },
    onError: () => {
      showNotification('an error has occurred', 'red')
    },
  })

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    newCommentMutation.mutate({ id, comment })
    event.target.comment.value = ''
  }

  const handleLike = (blog) => {
    dispatch({
      type: 'EDIT',
      payload: { ...blog, user: blog.user.id },
    })
  }

  const handleDelete = (id) => {
    if (confirm('Do you want to deleted it!') == true) {
      dispatch({ type: 'DELETE', payload: { token, id } })
      navigate('/')
    }
  }

  if (blogList === null || !id) {
    return null
  }

  if (result.isError) {
    return <div>Error datas ...</div>
  }
  
  if (resultComments.isLoading) {
    return <div>Loading comments datas ...</div>
  }
  if (resultComments.isError) {
    return <div>Error comments datas ...</div>
  }

  return (
    <>
      <h1>{blogList.title}</h1>
      <p>
        <a
          style={{ color: 'blue' }}
          target='_blank'
          rel='noopener noreferrer'
          href={blogList.url}
        >
          {blogList.url}
        </a>
      </p>
      <p>
        <span>{blogList.likes}</span> Likes{' '}
        <Button
          variant='contained'
          size='small'
          onClick={() => handleLike(blogList)}
          startIcon={<ThumbUpAltIcon />}
        >
          Like
        </Button>{' '}
        {isCreated && (
          <Button
            variant='contained'
            size='small'
            color='error'
            onClick={() => handleDelete(blogList.id)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </p>
      <p>Added by {blogList.user.name}</p>
      <h3>comments</h3>

      <form onSubmit={addComment}>
        {/* <input type='text' name='comment' />
        <button type='submit'>add Comment</button> */}
        <TextField
          id='standard-basic'
          label='comment'
          variant='standard'
          name='comment'
        />
        <Button
          variant='contained'
          type='submit'
          size='small'
          endIcon={<SendIcon />}
        >
          add Comment
        </Button>
      </form>

      {resultComments.data.length ? (
        <ul>
          {resultComments.data.map((resultComment) => (
            <li key={resultComment.id}>{resultComment.comment}</li>
          ))}
        </ul>
      ) : (
        <p>No Comments</p>
      )}
    </>
  )
}

export default BlogSingle