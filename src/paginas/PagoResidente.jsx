import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import useResidentes from '../hooks/useResidentes'
import FormularioPago from "../components/FormularioPago"

const PagoResidente = () => {
  const params = useParams();
  const {obtenerResidente, obtenerMedicamento, residente, medicamento, cargando} = useResidentes()

  useEffect( () => {
    obtenerResidente(params.id)
  },[])

  const {nombreCompleto, edad, fechaIngreso, padecimiento } = residente

  if(cargando) return 'cargado..'

  return(
    <>
        <h1 className="flex flex-row pt-4 pl-10 text-4xl text-blue-006 font-black capitalize">Pago
          <svg
            className=" w-9 h-9 flex fill-blue-006"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
              <path
                d="M18.5,9.5A1.5,1.5,0,0,0,20,8V7.313A5.32,5.32,0,0,0,14.687,2H13.5V1.5a1.5,1.5,0,0,0-3,0V2H9.313A5.313,5.313,0,0,0,7.772,12.4l2.728.746V19H9.313A2.316,2.316,0,0,1,7,16.687V16a1.5,1.5,0,0,0-3,0v.687A5.32,5.32,0,0,0,9.313,22H10.5v.5a1.5,1.5,0,0,0,3,0V22h1.187a5.313,5.313,0,0,0,1.541-10.4L13.5,10.856V5h1.187A2.316,2.316,0,0,1,17,7.313V8A1.5,1.5,0,0,0,18.5,9.5Zm-3.118,4.979a2.314,2.314,0,0,1-.7,4.521H13.5V13.965ZM10.5,10.035,8.618,9.521A2.314,2.314,0,0,1,9.313,5H10.5Z"
              />
          </svg>
        </h1>
        <div className="p-5">
        <form
            className="grid grid-cols-4 gap-2 basis-6/7 md:basis-5/6 bg-slate-50 shadow rounded-lg p-5"
        >
                <div className="pt-2 col-start-1 col-end-4">
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="nombres"
                    >Nombre Completo</label>
                    <input
                        id="nombres"
                        type="text"
                        placeholder="Nombre(s)"
                        className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={nombreCompleto}
                        disabled={true}
                    />
                </div>
                <div className='pt-2 col-start-1'>
                    <label
                        className=" w-full text-gray-700 uppercase font-bold text-sm"
                        htmlFor="fecha-ingreso"
                    >Fecha ingreso</label>

                    <input
                        id="fecha-ingreso"
                        type="date"
                        className="w-40 mt-1 p-1 border rounded-xl bg-gray-100"
                        value={fechaIngreso?.split('T')[0]}
                        disabled={true}
                    />
                </div>
                <div className="pt-2 col-start-3">
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="edad"
                    >Edad</label>
                    <input
                        id="edad"
                        type="text"
                        placeholder="edad"
                        maxLength="3"
                        className="capitalize w-14 mt-1 p-1 border rounded-xl bg-gray-100"
                        value={edad}
                        disabled={true}
                    />
                </div>
                <div className='pt-2 col-span-3 w-4/5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="padecimiento"
                    >Padecimiento</label>

                    <textarea
                        id="padecimiento"
                        placeholder="Padecimiento del residente"
                        className="capitalize w-full h-28 mt-1 p-1 border rounded-xl bg-gray-100"
                        value={padecimiento}
                        disabled={true}
                    />
                </div>

          </form>
        </div>
        <div className="my-2 flex justify-center">
          <FormularioPago />
        </div>
    </>
  )
}

export default PagoResidente
