//core
import React, {useEffect, useState} from "react";

const Notifications: React.FC = () => {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {

  }, [])

  const unread_notifications: Notification[] = notifications.filter(notification => !notification.isRead)
  return (
    <div className="pl-4 flex relative">
      {/*<span className="animate-pulse absolute h-3 w-3 rounded-full bg-red-900 opacity-75"/>*/}
      {
        unread_notifications.length > 0 && (
          <div className="absolute h-3 w-3 bg-white rounded-full right-0 flex">
            <i className="animate-pulse m-auto h-2 w-2 rounded-full" style={{
              background: '#CC5C81'
            }}/>
          </div>
        )
      }
      <i className="material-icons cursor-pointer m-auto text-myGray">notifications</i>
    </div>
  )
}

export default Notifications