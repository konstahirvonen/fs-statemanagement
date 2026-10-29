import { useContext } from "react"
import NotificationContext from "../NotificationContext"

export const useNotify = () => {
    const { voteNotification, addNotification, invalidAnecdote, clearNotification } = useContext(NotificationContext)

    const notifyVoteAnecdote = (content) => {
        voteNotification(content)
        setTimeout(clearNotification, 5000)
    }

    const notifyAddAnecdote = (content) => {
        addNotification(content)
        setTimeout(clearNotification, 5000)
    }

    const notifyInvalidAnecdote = () => {
        invalidAnecdote()
        setTimeout(clearNotification, 5000)
    }

    return {notifyVoteAnecdote, notifyAddAnecdote, notifyInvalidAnecdote}
}