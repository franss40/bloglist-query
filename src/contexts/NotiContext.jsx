import { createContext, useState } from "react"

export const NotisContext = createContext(null)

const NotiContext = ({ children }) => {
  const [notification, setNotification] = useState({content: null, color: 'red'})

  const showNotification = (content, color) => {
    setNotification({ content, color })
    setTimeout(() => {
      setNotification({ content: null, color: "red" })
    }, 3000)
  }

  const values = { notification, showNotification }
  return (
    <NotisContext.Provider value={values} >
      { children }
    </NotisContext.Provider>
  )
}

export default NotiContext