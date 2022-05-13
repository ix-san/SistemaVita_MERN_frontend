import {useState, useEffect, createContext} from 'react'
import {useNavigate} from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const AuthContext = createContext();

//Rodear toda la app, de donde viene los datos, para que este disponible los datos en los demas componente - children
const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')
        if(!token){
          setCargando(false)
          return
        }

        const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

        try {
          const {data} = await clienteAxios('/usuario/perfil', config)
          setAuth(data)
          navigate('/vita')

        } catch (error) {
          setAuth({})
        } finally {
          setCargando(false)
        }
      }
      autenticarUsuario()
  },[])

  const cerrarSesionAuth = () => {
    setAuth({})
  }

  return(
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}

export default AuthContext;
