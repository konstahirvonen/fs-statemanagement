import { useAnecdotes } from "../hooks/useAnecdotes"
import { useNotify } from "../hooks/useNotify"


const AnecdoteForm = () => {
  const { addAnecdote: addAnecdoteToServer } = useAnecdotes()
  const { notifyAddAnecdote } = useNotify()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value

    e.target.reset()
    addAnecdoteToServer(content)
    notifyAddAnecdote(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm