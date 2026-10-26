import { useAnecdoteActions, useAnecdotes } from "../store"
import Filter from "./Filter"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote } = useAnecdoteActions()
    const sortedAnecdotes = anecdotes.toSorted(
        (a, b) => b.votes - a.votes
    )

    return (
        <div>
            <Filter />
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map((anecdote) => (
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