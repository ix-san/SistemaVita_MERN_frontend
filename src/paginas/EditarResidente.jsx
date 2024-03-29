import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import useResidentes from '../hooks/useResidentes'
import FormularioResidente from "../components/FormularioResidente"

const EditarResidente = () => {
  const params = useParams();
  const {obtenerResidente, residente, cargando} = useResidentes()
  useEffect( () => {
    obtenerResidente(params.id)
  },[])

  const {nombreCompleto} = residente

  if(cargando) return 'cargado..'

  return(
    <>
        <h1 className="flex flex-row pt-4 pl-10 text-4xl text-blue-006 font-black capitalize">Editar: {nombreCompleto}
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
        <div className="my-2 flex justify-center">
            <FormularioResidente />
        </div>
    </>
  )
}

export default EditarResidente
