const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blog => {
    response.json(blog)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }

  if (!blog.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }
    

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter