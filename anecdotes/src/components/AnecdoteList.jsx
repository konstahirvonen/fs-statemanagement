import { useAnecdoteActions, useAnecdotes, useNotificationActions } from "../store"
import Filter from "./Filter"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote } = useAnecdoteActions()
    const { remove } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()
    const sortedAnecdotes = anecdotes.toSorted(
        (a, b) => b.votes - a.votes
    )

    return (
        <div>
            <Filter />
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                <div data-testid="anecdote">{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        vote(anecdote.id)
                        setNotification(`you voted '${anecdote.content}'`)
                    }}>vote</button>
                    {anecdote.votes === 0 && anecdote && (
                        <button onClick={() => remove(anecdote.id)}>delete</button>
                    )}
                </div>
            </div>
        ))}
      </div>
    )
}

export default AnecdoteList