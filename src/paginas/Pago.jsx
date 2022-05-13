import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useResidentes from "../hooks/useResidentes"
import useAlerta from '../hooks/useAlerta'
import Alerta from '../components/Alerta'

const Pago  = () =>{

  const [userSesion, setUserSesion] = useState(false)

  const {auth} = useAuth()
  const params = useParams();
  const {obtenerPago, pago, cargando, eliminarpago} = useResidentes()

  const {mostrarAlerta, alerta} = useAlerta();

  useEffect( () => {
    obtenerPago(params.id)

    if (auth.rol_idRol.toString() === import.meta.env.VITE_USERS.toString()) {
      setUserSesion(true)
    }
  },[])

  const handleClick = () => {
    if (confirm('¿Desea eliminar este pago? \n\n Un pago eliminado no se podrá recuperar.')) {
      eliminarpago(params.id)
    }
  }

  const {nombreCompleto, fecharealizo, fechaRegistroSist, cantidad} = pago

  const {msg} = alerta

  return (
    cargando ? 'Cargando...' : (
      <div className="p-5">
        <h1 className='flex pt-4 text-4xl text-blue-006 font-black capitalize'>{nombreCompleto}
          <svg
            className=" w-9 h-9 flex fill-blue-006"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            >
              <path
              d="M208 48C208 74.51 186.5 96 160 96C133.5 96 112 74.51 112 48C112 21.49 133.5 0 160 0C186.5 0 208 21.49 208 48zM152 352V480C152 497.7 137.7 512 120 512C102.3 512 88 497.7 88 480V256.9L59.43 304.5C50.33 319.6 30.67 324.5 15.52 315.4C.3696 306.3-4.531 286.7 4.573 271.5L62.85 174.6C80.2 145.7 111.4 128 145.1 128H174.9C208.6 128 239.8 145.7 257.2 174.6L315.4 271.5C324.5 286.7 319.6 306.3 304.5 315.4C289.3 324.5 269.7 319.6 260.6 304.5L232 256.9V480C232 497.7 217.7 512 200 512C182.3 512 168 497.7 168 480V352L152 352z"
              />
          </svg>
        </h1>

        {userSesion
          ?''
          :
            <>
              <div className="flex justify-end pl-16">
              <button
                onClick={handleClick}
                disabled={userSesion ?true :false}
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
            </>
        }

        <form
          className="grid grid-cols-3 gap-5 basis-6/7 md:basis-5/6 bg-slate-50 shadow rounded-lg p-5"
        >
                  <div className="col-start-1 col-end-4">
                    {msg && <Alerta alerta={alerta} />}
                  </div>
                  <div className="pt-2 col-span-3">
                      <label
                          className="uppercase text-gray-600 font-bold block text-sm"
                          htmlFor="monto"
                      >Monto</label>
                      <input
                          id="monto"
                          type="text"
                          maxLength="5"
                          className="uppercase w-1/3 mt-1 p-1 border rounded-xl bg-gray-100"
                          value={cantidad}
                          disabled={true}
                      />
                  </div>
                  <div className='pt-2'>
                      <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="fecha-entrega"
                      >Fecha de pago</label>

                      <input
                          id="fecha-entrega"
                          type="date"
                          className="w-full mt-1 p-1 border rounded-xl bg-gray-100"
                          value={fecharealizo?.split('T')[0]}
                          disabled={true}
                      />
                  </div>
                  <div className='pt-2 col-span-2 lg:col-span-1'>
                      <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="fecha-entrega"
                      >Fecha de registro en el sistema</label>

                      <input
                          id="fecha-entrega"
                          type="date"
                          className="w-1/2 mt-1 p-1 border rounded-xl bg-gray-100"
                          value={fechaRegistroSist?.split('T')[0]}
                          disabled={true}
                      />
                  </div>
            </form>
      </div>
    )
  )
}
export default Pago
