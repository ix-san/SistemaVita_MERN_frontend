import {useState} from 'react'
import useAlerta from '../hooks/useAlerta'
import useResidentes from '../hooks/useResidentes'
import Alerta from '../components/Alerta'
import PreviewResidente from "../components/PreviewResidente"
import PreviewPago from "../components/PreviewPago"

const Buscar = () => {

  const [buscadorResi, setBuscadorResi] = useState('')
  const [buscando, setBuscando] = useState(false)

  const {cargando, submitBuscandorResidente, residenteBuscar, pagosBuscar, pagosMontoBuscar} = useResidentes();
  const {mostrarAlerta, alerta} = useAlerta();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([buscadorResi].includes(''))
    {
      mostrarAlerta({
        msg: 'El Campo Es Obligatorio',
        error: true
      })
      return
    }

    setBuscando(true)

    //Pasar los datos el Provider
    await submitBuscandorResidente({buscadorResi})

  }

  const {cantidad} = pagosMontoBuscar

  const {msg} = alerta

  if(cargando) return 'cargado..'

  return(
    <>
    <div className= "my-3">
        <h1 className=" flex flex-row pt-4 pl-10 text-4xl text-blue-006 font-black capitalize">Buscar residente
          <svg
            className="flex w-12 h-12 py-2 pr-3 fill-blue-006"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
            d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
            />
          </svg>
        </h1>

        <form
        className="flex flex-col text-center mt-3 rounded-lg mx-4"
        onSubmit={handleSubmit}
        >
          <div className="pt-2">
            {msg && <Alerta alerta={alerta} />}
          </div>
          <div className="pt-2">
              <label
                  className="uppercase text-gray-600 font-bold block text-sm pb-1"
                  htmlFor="residente-name"
              >Nombre del Residente:</label>
              <input
                  id="residente-name"
                  type="text"
                  maxLength="73"
                  placeholder="nombre del residente"
                  className="uppercase w-full md:w-1/2 border rounded-xl bg-gray-100 pl-2"
                  value={buscadorResi}
                  onChange={e => setBuscadorResi(e.target.value)}
              />
          </div>
          <div className="pb-3">
              <input
                  type="submit"
                  value="Buscar Residente"
                  className='bg-sky-600 mt-2 w-1/3 p-2 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors overflow-y-auto'
              />
          </div>
        </form>

          <div className="flex flex-col md:flex-row bg-blue-4f5 border-b p-1 shadow mt-5 rounded-lg mx-10">
            <p className="md:basis-1/2 text-sky-cdc text-sm md:text-md text-center md:text-left font-black">Nombre</p>
            <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black">Fecha de Nacimiento</p>
            <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black">Edad</p>
            <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center text-left font-black">Padecimiento</p>
            <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black">Fecha de Ingreso</p>
            <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black">Estado</p>
            <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md font-black"></p>
          </div>
          <div className="overflow-y-auto h-52 md:h-2/3 bg-blue-898 shadow rounded-lg mx-10">
              {!buscando ? <p className="text-center text-blue-354 uppercase p-3">No hay residentes</p> : (
                cargando ? <p className="text-center">cargando...</p> :(
                  residenteBuscar.length ?
                  residenteBuscar.map(residente => (
                    <PreviewResidente
                        key={residente.idResidente}
                        residente={residente}
                    />
                  ))
                : <p className="text-center text-blue-354 uppercase p-3">No hay residentes</p>))}
        </div>

        <div className="flex flex-col md:flex-row bg-blue-4f5 border-b p-1 shadow mt-5 rounded-lg mx-10">
          <p className="md:basis-1/2 text-sky-cdc text-sm text-center md:text-left md:text-md font-black">Nombre</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center md:text-right font-black">Cantidad</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black">Fecha de Pago</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md text-center font-black">Estado</p>
          <p className="md:basis-1/4 text-sky-cdc text-sm md:text-md font-black"></p>
        </div>
        <div className="overflow-y-auto h-72 md:h-1/6 bg-blue-898 shadow rounded-lg mx-10">

            { !buscando ? <p className="text-center text-blue-354 uppercase p-3">No hay pagos</p> : (
                cargando ? <p className="text-center">cargando...</p> :(
                  pagosBuscar.length ?
                  pagosBuscar.map(pago => (
                    <PreviewPago
                        key={pago.idPago}
                        pago={pago}
                    />
                  ))
                  : <p className="text-center text-blue-354 uppercase p-3">No hay pagos</p>))}

        </div>
        <div className="justify-center my-2 mx-10 pt-2">
            <label
                className="justify-center uppercase text-gray-600 font-bold block text-sm"
            >Monto:</label>
            <input
                type="text"
                className="justify-center uppercase w-4/5 md:w-1/2 border rounded-xl bg-sky-cdc text-right font-bold pr-3"
                value={
                  cargando ? '...' : (
                    !buscando ? '0' : (cantidad===null || cantidad===undefined ? '0' : cantidad))}
                disabled={true}
            />
        </div>
      </div>
      <div className="mt-5 md:mt-0">.</div>
    </>
  )
}
export default Buscar
