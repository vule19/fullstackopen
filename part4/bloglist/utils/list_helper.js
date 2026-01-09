const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (maxLikes, blog) => {
        return Math.max(maxLikes, blog.likes)
    }

    return blogs.reduce(reducer, 0)
}

const mostBlogs  = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorCounts = _.countBy(blogs, "author")
  const topAthor = _.maxBy(Object.keys(authorCounts), (author) => authorCounts[author])
  return {
    author: topAthor,
    blogs: authorCounts[topAthor]
  }
}

const mostLikesAuthor  = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const groupedByAuthor = _.groupBy(blogs, "author")
  const groupLikes = _.map(groupedByAuthor, (authorBlogs, authorName) => {
    return {
      author: authorName,
      likes: _.sumBy(authorBlogs, 'likes')
    }
  })
  return _.maxBy(groupLikes, "likes")
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikesAuthor
}