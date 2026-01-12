import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import UserInfo from "./components/UserInfo"
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername(username)
      setPassword('')
    } catch {
      setErrorMessage({message: `wrong confidentials`, type: 'error'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
  }

  const addBlog = async blog => {
    try {
      const newBlog = await blogService.create(blog)
      const allBlogs = blogs.concat(newBlog)
      setBlogs(allBlogs)
      setErrorMessage({message: `a new blog ${blog.title} by ${blog.author} added`, type: 'success'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch {
      setErrorMessage({message: `'blog cannot be added'`, type: 'error'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage}></Notification>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}></Notification>
      <UserInfo username={username} handleLogout={handleLogout}></UserInfo>
      <Togglable buttonLabel="create new blog">
        <AddBlog addBlog={addBlog}></AddBlog>
      </Togglable>    
      {[...blogs]
        .sort((bloga, blogb) => blogb.likes - bloga.likes)
        .map(blog =>
        <Blog key={blog.id} user={user} blog={blog}>
        </Blog>
      )}
    </div>
  )
}

export default App