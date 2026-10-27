import { useAnecdoteActions, useNotificationActions } from "../store"

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        await add(content)
        setNotification(`You created anecdote: ${content}`)
        e.target.reset()
    }

    return (
        <div>
            <form onSubmit={addAnecdote}>
                <div>
                <input data-testid="new"
                    name="anecdote"
                />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm