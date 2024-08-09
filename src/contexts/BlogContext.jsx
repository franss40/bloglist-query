import { createContext, useReducer, useContext } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import blogService from "../services/blogs"
import { NotisContext } from "./NotiContext"

export const BlogsContext = createContext(null)

const BlogContext = ({ children }) => {
  const { notification, showNotification } = useContext(NotisContext)

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
    retry: 2,
  })

  function blogsReducer(blogs, action) {
    switch (action.type) {
      case 'GET':
        return action.payload
      case "ADD":
        const token = action.payload.token
        const author = action.payload.author
        const title = action.payload.title
        const url = action.payload.url
        const user = action.payload.user
        const response = newBlogMutation.mutate({ token, user, author, title, url })
        return response
      case "EDIT":
        const responseUpdate = updateMutation.mutate(action.payload)
        return responseUpdate
      case "DELETE":
        const responseDelete = deleteMutation.mutate(action.payload)
        return responseDelete
      default:
        return blogs
    }
  }
  
  const newBlogMutation = useMutation({
    mutationFn: async({ token, user, ...newBlog }) => {
      const u = await blogService.createBlog(newBlog, token)
      return {...u, user: {username: user.username, name: user.name, id: user.id}}
    },
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(
        ['blogs'],
        blogs.concat(newBlog)
      )
      showNotification("register added", "green")
    },
    onError: () => {
      showNotification("an error has occurred", "red")
    },
  })

  const updateMutation = useMutation({
    mutationFn: blogService.editBlog,
    onSuccess: (updateBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) =>
          blog.id === updateBlog.id
            ? {
                ...updateBlog,
                user: {
                  username: blog.user.username,
                  user: blog.user.user,
                  id: blog.user.id,
                },
              }
            : blog
        )
      )
      showNotification("register liked", "green")
    },
    onError: () => {
      showNotification("an error has occurred", "red")
    }
  })

  const deleteMutation = useMutation({
    mutationFn: ({ token, id }) => {
      return blogService.removeBlog(id, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      showNotification("register deleted", "green")
    },
    onError: () => {
      showNotification("an error has occurred", "red")
    },
  })

  const [blogs, dispatch] = useReducer(blogsReducer, result)

  const values = { result, dispatch }
  return (
    <BlogsContext.Provider value={values}>
      { children }
    </BlogsContext.Provider>
  )
}

export default BlogContext