import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext()
const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ''
  })

  //default axios
  axios.defaults.headers.common['Authorization'] = auth?.token
  useEffect(() => {
    let data = localStorage.getItem('auth');
    if(data){
      data = JSON.parse(data);
      setAuth({
        ...auth,
        user: data.user,
        token: data.token
      })
    }
    // eslint-disable-next-line 
  }, [])
  
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider}