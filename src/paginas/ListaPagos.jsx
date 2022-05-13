import {useState} from 'react'
import useAlerta from '../hooks/useAlerta'
import useResidentes from "../hooks/useResidentes"
import PreviewPago from "../components/PreviewPago"
import Alerta from '../components/Alerta'

const ListaPagos = () => {
  const estados = ['activo', 'inactivo', 'todos']
  const [busqueda, setBusqueda] = useState(false)
  const [fechaInicio, setFechaInicio]= useState('')
  const [fechaFinal, setFechaFinal]= useState('')
  const [selectEstado, setSelectEstado] = useState('')
  const [checkedState, setCheckedState] = useState(
    new Array(estados.length).fill(false)
  )

  const {mostrarAlerta, alerta} = useAlerta();
  const {submitFechas, pagos, cargando, pagosMonto, pagosMontoActivo, pagosMontoInactivo} = useResidentes()

  const handleOnChange = (position) => {

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedState(updatedCheckedState);

    const selectEstadoClick = estados[position]
    setSelectEstado(selectEstadoClick)

  };

  const handleSubmit = async e => {
    e.preventDefault();

    const idx = checkedState.indexOf(true);

    if ([fechaInicio, fechaFinal].includes(''))
    {
      mostrarAlerta({
        msg: 'Todos Los Campos Son Obligatorios',
        error: true
      })
      return
    }
    if(idx === -1)
    {
      mostrarAlerta({
        msg: 'Todos Los Campos Son Obligatorios',
        error: true
      })
      return
    }


    //Pasar los datos el Provider
    await submitFechas({fechaInicio, fechaFinal, selectEstado})

  }

  const {cantidadTotal} = pagosMonto
  const {cantidadActivo} = pagosMontoActivo
  const {cantidadInactivo} = pagosMontoInactivo

  const {msg} = alerta

  return(
    <>
      <h1 className=" flex flex-row pt-4 pl-10 text-4xl text-blue-006 font-black capitalize">Lista pagos
        <svg
          className="flex w-12 h-12 py-2 pr-3 fill-blue-006"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M18.5,9.5A1.5,1.5,0,0,0,20,8V7.313A5.32,5.32,0,0,0,14.687,2H13.5V1.5a1.5,1.5,0,0,0-3,0V2H9.313A5.313,5.313,0,0,0,7.772,12.4l2.728.746V19H9.313A2.316,2.316,0,0,1,7,16.687V16a1.5,1.5,0,0,0-3,0v.687A5.32,5.32,0,0,0,9.313,22H10.5v.5a1.5,1.5,0,0,0,3,0V22h1.187a5.313,5.313,0,0,0,1.541-10.4L13.5,10.856V5h1.187A2.316,2.316,0,0,1,17,7.313V8A1.5,1.5,0,0,0,18.5,9.5Zm-3.118,4.979a2.314,2.314,0,0,1-.7,4.521H13.5V13.965ZM10.5,10.035,8.618,9.521A2.314,2.314,0,0,1,9.313,5H10.5Z"
          />
        </svg>
      </h1>

      <form
      className="flex grid grid-cols-3 mt-3 rounded-lg mx-4 md:mx-9"
      onSubmit={handleSubmit}
      >
        <div className="col-start-1 col-end-4">
          {msg && <Alerta alerta={alerta} />}
        </div>
        <div className="pt-2">
            <label
                className="uppercase text-gray-600 font-bold block text-sm"
                htmlFor="fecha-inicio"
            >Fecha Inicio:</label>
            <input
                id="fecha-inicio"
                type="date"
                className="uppercase w-4/5 md:w-1/2 border rounded-xl bg-gray-100"
                value={fechaInicio}
                onChange={e => setFechaInicio(e.target.value)}

            />
        </div>
        <div className="pt-2">
            <label
                className="uppercase text-gray-600 font-bold block text-sm"
                htmlFor="fecha-final"
            >Fecha Final:</label>
            <input
                id="fecha-final"
                type="date"
                className="uppercase w-4/5 md:w-1/2 border rounded-xl bg-gray-100"
                value={fechaFinal}
                onChange={e => setFechaFinal(e.target.value)}
            />
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

        <input
            type="submit"
            value="Buscar"
            className='bg-sky-600 mt-2 col-start-2 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors overflow-y-auto'
        />
    </form>
    <div className="h-80 md:h-1/2">
      <div className="flex flex-col md:flex-row bg-blue-4f5 border-b p-1 shadow mt-5 rounded-lg mx-10">
        <p className="md:basis-1/2 text-sky-cdc text-sm text-center md:text-left md:text-md font-black capitalize">nombre</p>
        <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center md:text-right font-black capitalize">cantidad</p>
        <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black capitalize">fecha de pago</p>
        <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black capitalize">estado</p>
        <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md font-black md:pr-3"></p>
      </div>
      <div className="overflow-y-auto h-56 md:h-5/6 bg-blue-898 shadow rounded-lg mx-10">
          { cargando ? <p className="text-center">cargando...</p> : (
              pagos.length ?
              pagos.map(pago => (
                <PreviewPago
                    key={pago.idPago}
                    pago={pago}
                />
              ))
              : <p className="text-center text-blue-354 uppercase p-3">No hay pagos</p>)}
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-1 mx-10 pt-2 gap-5">
        <div className="pt-3 pr-6 border-r-8 border-white">
            <label
                className="justify-center uppercase text-gray-600 font-bold block text-sm"
            >Monto Total:</label>
            <input
                type="text"
                className="justify-center uppercase w-4/5 md:w-full border rounded-xl bg-sky-cdc text-right font-bold pr-3"
                value={cargando ? '...' : (cantidadTotal===null ? '0' : cantidadTotal)}
                disabled={true}
            />
        </div>
        <div className="pt-2 pr-3">
            <label
                className="justify-center uppercase text-gray-600 font-bold block text-sm pl-4"
            >Activos :</label>
            <input
                type="text"
                className="justify-center uppercase w-4/5 md:w-full border rounded-xl bg-sky-cdc text-right font-bold pr-3"
                value={cargando ? '...' : (cantidadActivo===null ? '0' : cantidadActivo)}
                disabled={true}
            />
        </div>
        <div className="pt-2 pr-3">
            <label
                className="justify-center uppercase text-gray-600 font-bold block text-sm pl-4"
            >Inactivo:</label>
            <input
                type="text"
                className="justify-center uppercase w-4/5 md:w-full border rounded-xl bg-sky-cdc text-right font-bold pr-3"
                value={cargando ? '...' : (cantidadInactivo===null ? '0' : cantidadInactivo)}
                disabled={true}
            />
        </div>
      </div>
      <div className="mt-5">.</div>
    </>
  )
}

export default ListaPagos
