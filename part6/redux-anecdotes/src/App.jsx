import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer, { voteAnecdote, addAnecdote, vote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch({
      type: 'anecdotes/addAnecdote',
      content: content
    })
  } 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <AnecdoteList anecdotes={anecdotes} vote={vote}></AnecdoteList>
      <AnecdoteForm addAnecdote={addAnecdote}></AnecdoteForm>
    </div>
  )
}

export default App
