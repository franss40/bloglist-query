import { createContext, useState, useEffect, useContext } from "react"
import loginService from "./../services/login"
import { NotisContext } from "./NotiContext"

export const UsersContext = createContext(null)

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const { notification, showNotification } = useContext(NotisContext)

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem("loggedUser")
    if (loggedJSON) {
      const users = JSON.parse(loggedJSON)
      setUser(users)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      showNotification("user register", "green")
    } catch (error) {
      showNotification("user nor register", "red")
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    showNotification("user logout", "green")
  }

  return (
    <UsersContext.Provider value={{ user: user, handleLogin, handleLogout }}>
      { children }
    </UsersContext.Provider>
  )
}

export default UserContext;