import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import useResidentes from '../hooks/useResidentes'
import FormularioMedicamento from "../components/FormularioMedicamento"

const MedicamentosResidente = () => {
  const params = useParams();
  const {obtenerResidente, obtenerMedicamento, residente, medicamento, cargando} = useResidentes()

  useEffect( () => {
    obtenerResidente(params.id)
    obtenerMedicamento(params.id)

  },[])

  const {nombreCompleto, edad, fechaIngreso, padecimiento } = residente

  if(cargando) return 'cargado..'
  return(
    <>
        <h1 className="flex flex-row pt-4 pl-10 text-4xl text-blue-006 font-black capitalize">Medicamentos
          <svg
            className="w-9 h-9 md:w-11 md:h-11 pl-3 fill-blue-006"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
            d="M112 32C50.12 32 0 82.12 0 143.1v223.1c0 61.88 50.12 111.1 112 111.1s112-50.12 112-111.1V143.1C224 82.12 173.9 32 112 32zM160 256H64V144c0-26.5 21.5-48 48-48s48 21.5 48 48V256zM299.8 226.2c-3.5-3.5-9.5-3-12.38 .875c-45.25 62.5-40.38 150.1 15.88 206.4c56.38 56.25 144 61.25 206.5 15.88c4-2.875 4.249-8.75 .75-12.25L299.8 226.2zM529.5 207.2c-56.25-56.25-143.9-61.13-206.4-15.87c-4 2.875-4.375 8.875-.875 12.38l210.9 210.7c3.5 3.5 9.375 3.125 12.25-.75C590.8 351.1 585.9 263.6 529.5 207.2z"
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
          <FormularioMedicamento />
        </div>
    </>
  )
}

export default MedicamentosResidente
