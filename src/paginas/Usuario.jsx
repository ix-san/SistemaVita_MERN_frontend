import {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import useUsuarios from '../hooks/useUsuarios'
import useAlerta from '../hooks/useAlerta'
import Alerta from '../components/Alerta'

const Usuario  = () =>{
  const params = useParams();
  const {obtenerUsuario, usuario, cargando, eliminarUsuario} = useUsuarios()
  const {mostrarAlerta, alerta} = useAlerta();

  useEffect( () => {
    obtenerUsuario(params.id)
  },[])

  const handleClick = () => {
    if (confirm('¿Desea eliminar este usuario?')) {
      eliminarUsuario(params.id)
    }
  }

  const {userFullName, userNames, userApePaterno, userApeMaterno, username, create_time} = usuario

  if(cargando) return 'cargado..'

  const {msg} = alerta

  return (
      <div>
        <h1 className='flex pt-4 pl-10 text-4xl text-blue-006 font-black capitalize'>{userFullName}
          <svg
            className="flex w-10 h-10 pl-2 fill-blue-006"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
            />
          </svg>
        </h1>

        <div className="flex justify-end pl-16 pr-4">
            <button
              onClick={handleClick}
            >
              <svg
                className="w-9 h-9 md:w-11 md:h-11 pl-3 fill-gray-400 transition transform hover:scale-125 motion-reduce:transition-none motion-reduce:hover:transform-none hover:fill-blue-006"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17,4V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2V4ZM11,17H9V11h2Zm4,0H13V11h2ZM15,4H9V2h6Z"
                />
              </svg>
            </button>
        </div>
        <div className="p-5">
            <form
              className="grid grid-cols-3 gap-2 basis-6/7 md:basis-4/5 bg-slate-50 shadow rounded-lg p-5"
            >
                  <div className="col-start-1 col-end-4">
                    {msg && <Alerta alerta={alerta} />}
                  </div>

                  <div className="pt-2">
                      <label
                          className="uppercase text-gray-600 font-bold block text-sm"
                          htmlFor="nombres"
                      >Nombre(s)</label>
                      <input
                          id="nombres"
                          type="text"
                          placeholder="Nombre(s)"
                          className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                          defaultValue={userNames}
                      />
                  </div>
                  <div className="pt-2">
                      <label
                          className="uppercase text-gray-600 font-bold block text-sm"
                          htmlFor="apellidopaterno"
                      >Apellido paterno</label>
                      <input
                          id="apellidopaterno"
                          type="text"
                          placeholder="Apellido Paterno"
                          className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                          defaultValue={userApePaterno}
                      />
                  </div>
                  <div className="pt-2">
                      <label
                          className="uppercase text-gray-600 font-bold block text-sm"
                          htmlFor="apellidomaterno"
                      >Apellido materno</label>
                      <input
                          id="apellidomaterno"
                          type="text"
                          placeholder="Apellido Materno"
                          className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                          defaultValue={userApeMaterno}
                      />
                  </div>
                  <div className="my-9 col-start-1">
                      <label
                          className="uppercase text-gray-600 font-bold block text-sm"
                          htmlFor="username"
                      >Nombre de usuario</label>
                      <input
                          id="username"
                          type="text"
                          placeholder="Usuario"
                          className="capitalize w-1/3 mt-1 p-1 border rounded-xl bg-gray-100"
                          defaultValue={username}
                      />
                  </div>
                  <div className='my-9 col-start-3'>
                      <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="fecha-registro"
                      >Fecha Registro</label>

                      <input
                          id="fecha-registro"
                          type="date"
                          className="w-full mt-1 p-1 border rounded-xl bg-gray-100"
                          defaultValue={create_time?.split('T')[0]}
                          disabled={true}
                      />
                  </div>
              </form>
        </div>
      </div>
  )
}
export default Usuario
