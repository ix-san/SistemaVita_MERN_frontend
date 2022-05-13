import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const RutaProtegida = () => {

  const {auth, cargando} = useAuth()

  if(cargando) return 'Cargando...'

  return(
    <>
      {auth.username ?
        (
          <div className='bg-gray-100'>
              <Header />

              <div className='md:flex md:min-h-screen'>
                  <Sidebar />

                  <main className='bg-sky-cdc flex-1'>
                    <Outlet />
                  </main>
              </div>
          </div>

        ): <Navigate to="/" />}
    </>
  )
}

export default RutaProtegida
