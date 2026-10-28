import { useAnecdotes } from "../hooks/useAnecdotes"

const AnecdoteForm = () => {
  const { addAnecdote: addAnecdoteToServer } = useAnecdotes()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.reset()
    addAnecdoteToServer(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" minLength={5} />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm