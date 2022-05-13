import {useState, useEffect, createContext} from 'react'
import useAlerta from '../hooks/useAlerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'
import {useNavigate} from 'react-router-dom'

const UsuariosContext = createContext();

const UsuariosProvider = ({children}) =>{

  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [cargando, setCargando] = useState(false);

  const {mostrarAlerta, alerta} = useAlerta({});
  const {auth} = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
      const obtenerUsuario = async () => {
        try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }
          const {data} = await clienteAxios('/usuario', config)
          setUsuarios(data)
        } catch (error) {
          console.log(error)
        }
      }
      obtenerUsuario()
  }, [auth])

  const submitUsuario = async user => {
    try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/usuario', user, config)

            setUsuarios([...usuarios, data])

            mostrarAlerta({
              msg: 'Usuario Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                mostrarAlerta({})
                navigate('/vita/lista-usuario')
            },3000);

    } catch (error) {
            mostrarAlerta({
              msg: error.response.data.msg,
              error: true
            })
    }
  }

  const obtenerUsuario = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }

      const {data} = await clienteAxios(`/usuario/${id}`, config)
        setUsuario(data)
    } catch (error) {
        console.log(error);
    } finally {
      setCargando(false)
    }
  }

  const eliminarUsuario = async id => {
    try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }
          const {data} = await clienteAxios.delete(`/usuario/${id}`, config)
          //Sicronizar el state
          const usuariosActualizados = usuarios.filter(usuarioState  => usuarioState.idUser != id)
          setUsuarios(usuariosActualizados)

          mostrarAlerta({
            msg: data.msg,
            error: false
          })

          setTimeout(() => {
              mostrarAlerta({})
              navigate('/vita/lista-usuario')
          },3000);

    } catch (error) {
          mostrarAlerta({
            msg: error.response.data.msg,
            error: true
          })
    }
  }

  const cerrarSesionUsuario = () => {
    setUsuarios([])
    setUsuario({})
  }

  return(
    <UsuariosContext.Provider
      value={{
        usuarios,
        submitUsuario,
        obtenerUsuario,
        usuario,
        cargando,
        eliminarUsuario,
        cerrarSesionUsuario
      }}
    >{children}

    </UsuariosContext.Provider>
  )
}
 export {
   UsuariosProvider
 }

export default UsuariosContext
