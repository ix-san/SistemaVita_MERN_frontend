import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

  const [userSesion, setUserSesion] = useState(false)

  const {auth} = useAuth()

  useEffect(() => {
    if (auth.rol_idRol.toString() === import.meta.env.VITE_USERS.toString()) {
      setUserSesion(true)
    }
  },[])

  return(
    <aside className='md:w-70 lg:w-70 px-3 py-4'>
      <div>
          {userSesion
            ?
              <>
                  <h1 className='text-blue-006 font-black text-2xl mt-7 text-center uppercase'>Residente
                  </h1>
                  <Link
                      to={"lista-residentes"}
                      className='capitalize w-full p-1 font-bold block text-center rounded-lg hover:bg-sky-cdc'
                  >Lista residentes</Link>
                  <Link
                      to="lista-pagos"
                      className='capitalize w-full p-1 font-bold block text-center rounded-lg hover:bg-sky-cdc'
                  >Lista pagos</Link>
              </>
            :
              <>
                  <h1 className='text-blue-006 font-black text-2xl text-center uppercase'>Usuario
                  </h1>
                  <Link
                      to={userSesion ?"/vita" :"crear-usuario"}
                      className='capitalize w-full p-1 font-bold block text-center rounded-lg hover:bg-sky-cdc'
                  >Nuevo usuario</Link>
                  <Link
                      to={userSesion ?"/vita" :"lista-usuario"}
                      className='capitalize w-full p-1 font-bold block text-center rounded-lg hover:bg-sky-cdc'
                  >Lista usuarios</Link>

                  <h1 className='text-blue-006 font-black text-2xl mt-7 text-center uppercase'>Residente
                  </h1>
                  <Link
                      to={userSesion ?"/vita" :"crear-residente"}
                      className='capitalize w-full p-1 font-bold block text-center rounded-lg hover:bg-sky-cdc'
                  >Nuevo residente</Link>
                  <Link
                      to={"lista-residentes"}
                      className='capitalize w-full p-1 font-bold block text-center rounded-lg hover:bg-sky-cdc'
                  >Lista residentes</Link>
                  <Link
                      to="lista-pagos"
                      className='capitalize w-full p-1 font-bold block text-center rounded-lg hover:bg-sky-cdc'
                  >Lista pagos</Link>
             </>
            }
      </div>
    </aside>
  )
}

export default Sidebar
