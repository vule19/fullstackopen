import { use, useState } from 'react'
import blogService from '../services/blogs'

const ViewBlog = ({ blog, user }) => {
  const [likes, setLikes] = useState(blog.likes)

  const likeSubmit = async (event) => {
    event.preventDefault()
    const updatedBlog = {
      user: user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const result = await blogService.update(blog.id, updatedBlog)
    setLikes(result.likes)
    return result
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
      } catch (exception) {
        console.error('Error deleting blog', exception)
      }
    }
  }

  if (blog.user && blog.user.username === user.username) {
    return (
    <div>
    <div>{blog.url}</div>
    <div>{likes}
        <button onClick={likeSubmit}>Like</button>
    </div>
    <div>{blog.author}</div>
    <button onClick={removeBlog}>remove</button>
  </div>
  ) 
  }

  return (
    <div>
    <div>{blog.url}</div>
    <div>{likes}
        <button onClick={likeSubmit}>Like</button>
    </div>
    <div>{blog.author}</div>
  </div>
  )  
}

export default ViewBlog