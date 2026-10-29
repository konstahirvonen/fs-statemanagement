import { createContext, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider= (props) => {
    const [notification, setNotification] = useState("")

    const addNotification = (content) => setNotification(`You created anecdote: ${content}`)
    const invalidAnecdote = () => setNotification("too short anecdote, must have 5 or more")
    const voteNotification = (content) => setNotification(`anecdote '${content}' voted`)
    const clearNotification = () => setNotification("")

    return (
        <NotificationContext.Provider data-testid="notification" value={{notification, addNotification, invalidAnecdote, voteNotification, clearNotification}}>
            {props.children}
        </NotificationContext.Provider>
    )
}