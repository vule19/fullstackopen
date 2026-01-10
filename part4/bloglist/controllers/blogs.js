const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body // Define 'body' here

  const user = await User.findById(body.userId)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  if (!blog.url || !blog.title) {
    return response.status(400).json({ error: 'url or title missing' })
  }
    
  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findByIdAndDelete(id)
  if (blog) {
    response.status(204).end()
  }
  else {
    response.status(404).json({ error: 'blog not found' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const {likes} = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    { likes }
  )
  if (updatedBlog) {
    response.json(blog)
  }
  else {
    response.status(404).json({ error: 'Blog not found' })
  }
  
})

module.exports = blogsRouter