import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch({
      type: 'ADD',
      content: content
    })
  } 

  return (
    <div>
      <AnecdoteList anecdotes={anecdotes} vote={vote}></AnecdoteList>
      <AnecdoteForm addAnecdote={addAnecdote}></AnecdoteForm>
    </div>
  )
}

export default App
