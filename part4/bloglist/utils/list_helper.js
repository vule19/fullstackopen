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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}