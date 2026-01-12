import { useRef } from "react"
import Togglable from "./Togglable"
import ViewBlog from "./ViewBlog"

const Blog = ({ user, blog }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel="view">
          <ViewBlog blog={blog} user={user}></ViewBlog>
        </Togglable> 
    </div>  
  )
}

export default Blog