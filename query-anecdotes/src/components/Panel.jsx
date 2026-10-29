import { useAnecdotes } from '../hooks/useAnecdotes'
import AnecdoteForm from './AnecdoteForm'
import { useNotify } from '../hooks/useNotify'


const Panel = () => {
    const { anecdotes, isPending, voteAnecdote } = useAnecdotes()
    const { notifyVoteAnecdote } = useNotify()

    if (isPending) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const handleVote = (anecdote) => {
        voteAnecdote(anecdote)
        notifyVoteAnecdote(anecdote.content)
    }

    return (
        <div>
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            ))}

        </div>
    )
}

export default Panel