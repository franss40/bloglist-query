import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const BlogsView = ({ datas }) => {  
  const blogs = datas.data.sort(function (a, b) {
    return b.likes - a.likes
  })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link
                  style={{ color: 'blue', textDecoration: 'none' }}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell style={{textAlign: 'right'}}>{blog.user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogsView