import { useEffect } from "react"
import { useNotificationActions, useNotification } from "../store"

const Notification = () => {

  const notification = useNotification()
  const { clearNotification } = useNotificationActions()

  useEffect(() => {
    if (!notification)
      return

    const timeout = setTimeout(() => {
      clearNotification()
    }, 5000)

    return () => clearTimeout(timeout)
  }, [notification, clearNotification])

  if (!notification)
    return null

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  return (
    <div style={style} data-testid="notification">
      {notification}
    </div>
  )
}

export default Notification
