import { useContext } from "react"
import Togglable from "./components/Togglable"
import CreateBlog from "./components/CreateBlog"
import BlogsView from "./components/BlogsView"
import {BlogsContext} from "./contexts/BlogContext"

const App = () => {
  const { result } = useContext(BlogsContext)

  if (result.isLoading) {
    return <div>Loading datas ...</div>
  }
  if (result.isError) {
    return <div>Error datas ...</div>
  }

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Blogs</h1>
      <Togglable buttonLabel="Create Blog">
        <CreateBlog />
      </Togglable>
      <br />
      <BlogsView datas={result} />
    </>
  )
}

export default App
