import { useSelector } from 'react-redux'

const AnecdoteList = ({anecdotes, vote}) => {
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = [...anecdotes]
            .filter(anecdote => 
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {filteredAnecdotes
            .map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList