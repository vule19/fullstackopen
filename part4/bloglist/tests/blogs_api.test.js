const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    assert.strictEqual(firstBlog._id, undefined)
    assert.ok(firstBlog.id)
})

test('post test', async () => {
    const response = await api.get('/api/blogs')
    const totalBlogs = response.body.length
    const newBlog = {
        title: 'Testing the POST method',
        author: 'Full Stack Open',
        url: 'https://example.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const responseAfter = await api.get('/api/blogs')
    assert.strictEqual(responseAfter.body.length, totalBlogs+1)
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Testing default likes',
    author: 'Test Author',
    url: 'https://testurl.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('if likes url or title is missing', async () => {
  const newBlog = {
    title: 'Testing default likes',
    author: 'Test Author',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})


// test('all notes are returned', async () => {
//   const response = await api.get('/api/blogs')

//   assert.strictEqual(response.body.length, 2)
// })

// test('a specific note is within the returned notes', async () => {
//   const response = await api.get('/api/blogs')

//   const contents = response.body.map(e => e.content)
//   assert.strictEqual(contents.includes('HTML is easy'), true)
// })

after(async () => {
  await mongoose.connection.close()
})