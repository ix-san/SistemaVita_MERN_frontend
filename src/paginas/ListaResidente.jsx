import {useState} from 'react'
import useResidentes from "../hooks/useResidentes"
import useAlerta from '../hooks/useAlerta'
import PreviewResidente from "../components/PreviewResidente"
import Alerta from '../components/Alerta'

const ListaResidente = () => {
  const estados = ['activo', 'inactivo', 'todos']
  const [busqueda, setBusqueda] = useState(false)
  const [selectEstado, setSelectEstado] = useState('')
  const [checkedState, setCheckedState] = useState(
    new Array(estados.length).fill(false)
  )

  const {mostrarAlerta, alerta} = useAlerta();
  const {residentes, cargando, residentesActivos, residentesInactivos, residentesTodos, listaResidentesEstado} = useResidentes()

  const handleOnChange = (position) => {

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedState(updatedCheckedState);

    const selectEstado = estados[position]
    setSelectEstado(selectEstado)

  };

  const handleSubmit = async e => {
    e.preventDefault();

    const idx = checkedState.indexOf(true);

    if(idx === -1)
    {
      mostrarAlerta({
        msg: 'Se Debe Elegir Una Opcion',
        error: true
      })
      return
    }


    //Pasar los datos el Provider
    await listaResidentesEstado({selectEstado})

  }

  const {msg} = alerta

  return(
    <>
        <h1 className="flex flex-row pt-4 pl-10 text-4xl text-blue-006 font-black capitalize">Lista residentes
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
        <form
          className="flex grid grid-cols-3 mt-6 mx-10 md:mx-20 rounded-lg mx-4 text-justify"
          onSubmit={handleSubmit}
        >
          <div className="col-start-1 col-end-4">
            {msg && <Alerta alerta={alerta} />}
          </div>
            <div className="pt-2">
                  <label
                      className="uppercase text-gray-600 font-bold block text-sm"
                  >Estado:</label>
                  <ul>
                   {estados.map((elemento, index, array) => {
                       return (
                       <li key={index}>
                           <div >
                             <input
                               type="checkbox"
                               id={`custom-checkbox-${index}`}
                               name={elemento}
                               value={elemento}
                               checked={checkedState[index]}
                               onChange={() => handleOnChange(index)}
                             />
                             <label htmlFor={`custom-checkbox-${index}`}>{elemento}</label>
                           </div>
                       </li>
                     );
                   })}
                 </ul>
            </div>
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                <input
                type="submit"
                value="Buscar"
                className='bg-sky-600 mt-2 row-start-2 row-span-2 w-full p-2 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors overflow-y-auto'
                />
            </div>
        </form>

        <div className="flex flex-col md:flex-row bg-blue-4f5 border-b p-1 shadow mt-5 rounded-lg mx-10">
          <p className="md:basis-1/2 text-sky-cdc text-sm md:text-md text-center md:text-left font-black capitalize">nombre</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black capitalize">fecha de nacimiento</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black capitalize">edad</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center md:text-left font-black capitalize">padecimiento</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black capitalize">fecha de ingreso</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center md:text-right font-black capitalize">estado</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md font-black md:pr-3"></p>
        </div>
        <div className="overflow-y-auto h-60 md:h-2/4 bg-blue-898 shadow rounded-lg mx-10">
          {cargando ? <p className="text-center">cargando...</p> : (
            residentes.length ?
            residentes.map(residente => (
              <PreviewResidente
                  key={residente.idResidente}
                  residente={residente}
              />
            ))
          : <p className="text-center text-blue-354 uppercase p-3">No hay residentes</p>)}
      </div>

      <div className="flex flex-col md:flex-row mt-5 mb-5 rounded-lg mx-4">
        <div className="md:flex pt-2 border-r-8 border-white">
            <label
                className="uppercase text-gray-600 font-bold block text-sm md:text-md"
                htmlFor="total-residentes"
            >Total de residentes:</label>
            <input
                id="total-residentes"
                type="text"
                className="md:flex-initial uppercase w-4/5 md:w-1/2 border rounded-xl bg-gray-100 text-right pr-3"
                value={cargando ? '...' : (residentesTodos===null ? '0' : residentesTodos)}
                disabled={true}
            />
        </div>
        <div className="md:flex pt-2">
            <label
                className="uppercase text-gray-600 font-bold block text-sm md:text-md pl-4"
                htmlFor="activos"
            >Activos:</label>
            <input
                id="activos"
                type="text"
                className="md:flex-initial w-4/5 md:w-1/2 border rounded-xl bg-gray-100 text-right pr-3"
                value={cargando ? '...' : (residentesActivos===null ? '0' : residentesActivos)}
                disabled={true}
            />
        </div>
        <div className="md:flex pt-2">
            <label
                className="text-gray-600 uppercase font-bold block text-sm md:text-md pl-4"
                htmlFor="inactivos"
            >Inactivos:</label>
            <input
                id="inactivos"
                type="text"
                className="md:flex-initial uppercase w-4/5 md:w-1/2 border rounded-xl bg-gray-100 text-right pr-3"
                value={cargando ? '...' : (residentesInactivos===null ? '0' : residentesInactivos)}
                disabled={true}
            />
        </div>
      </div>
      <div className="mt-5 md:mt-0">.</div>
    </>
  )
}

export default ListaResidente
