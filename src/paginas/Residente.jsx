import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useResidentes from '../hooks/useResidentes'
import useAlerta from '../hooks/useAlerta'
import Alerta from '../components/Alerta'
import PreviewMedicamento from "../components/PreviewMedicamento"


const Residente  = () =>{
  const params = useParams();
  const estados = ['activo', 'inactivo']
  const [userSesion, setUserSesion] = useState(false)
  const [checkedState, setCheckedState] = useState(
    new Array(estados.length).fill(false)
  )

  const {auth} = useAuth()
  const {obtenerResidente,  residente, obtenerMedicamento, medicamento, cargando, eliminarResidente} = useResidentes()
  const {mostrarAlerta, alerta} = useAlerta();

  useEffect( () => {
    obtenerResidente(params.id)
    obtenerMedicamento(params.id)

    if (auth.rol_idRol.toString() === import.meta.env.VITE_USERS.toString()) {
      setUserSesion(true)
    }
  },[])

  useEffect( () => {
    const {estado} = residente

    if(estado === 'activo'){
      setCheckedState([true,false])
      const selectEstado = estados[0]
    }
    if(estado === 'inactivo'){
      setCheckedState([false,true])
      const selectEstado = estados[1]
    }
  },[residente])

  const handleClick = () => {
    if (confirm('¿Desea eliminar este residente? \n\n Un residente eliminado no se podrá recuperar, así como toda la infomacion que tenga que ver con el.')) {
      <p>hola</p>
      eliminarResidente(params.id)
    }
  }

  const {nombreCompleto, nombres, apellidoP, apellidoM, fechaNacimiento, edad, fechaIngreso, fechaEgreso, motivoInactivo, padecimiento, estado, datosEmergNombres, datosEmergApellidoP, datosEmergApellidoM, datosEmergFullName, datosEmergParentezco, datosEmergTel1, datosEmergTel2 } = residente

  if(cargando) return 'cargado..'

  const {msg} = alerta

  return (
      <div>
        <h1 className='flex pt-4 pl-10 text-4xl text-blue-006 font-black capitalize'>{nombreCompleto}
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
          ? ''
          :
            <>
                <div className="flex justify-end pl-16 pr-4">
                    <Link
                      to={userSesion ?"#" :`/vita/residente/medicamentos/${params.id}`}

                    >
                      <svg
                        className="w-9 h-9 md:w-11 md:h-11 pl-3 fill-gray-400 transition transform hover:scale-125 motion-reduce:transition-none motion-reduce:hover:transform-none hover:fill-blue-006"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                        d="M112 32C50.12 32 0 82.12 0 143.1v223.1c0 61.88 50.12 111.1 112 111.1s112-50.12 112-111.1V143.1C224 82.12 173.9 32 112 32zM160 256H64V144c0-26.5 21.5-48 48-48s48 21.5 48 48V256zM299.8 226.2c-3.5-3.5-9.5-3-12.38 .875c-45.25 62.5-40.38 150.1 15.88 206.4c56.38 56.25 144 61.25 206.5 15.88c4-2.875 4.249-8.75 .75-12.25L299.8 226.2zM529.5 207.2c-56.25-56.25-143.9-61.13-206.4-15.87c-4 2.875-4.375 8.875-.875 12.38l210.9 210.7c3.5 3.5 9.375 3.125 12.25-.75C590.8 351.1 585.9 263.6 529.5 207.2z"
                        />
                      </svg>

                    </Link>
                    <Link
                      to={userSesion ?"#" :`/vita/residente/pago/${params.id}`}

                    >
                      <svg
                        className="w-9 h-9 md:w-11 md:h-11 pl-3 fill-gray-400 transition transform hover:scale-125 motion-reduce:transition-none motion-reduce:hover:transform-none hover:fill-blue-006"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                        d="M18.5,9.5A1.5,1.5,0,0,0,20,8V7.313A5.32,5.32,0,0,0,14.687,2H13.5V1.5a1.5,1.5,0,0,0-3,0V2H9.313A5.313,5.313,0,0,0,7.772,12.4l2.728.746V19H9.313A2.316,2.316,0,0,1,7,16.687V16a1.5,1.5,0,0,0-3,0v.687A5.32,5.32,0,0,0,9.313,22H10.5v.5a1.5,1.5,0,0,0,3,0V22h1.187a5.313,5.313,0,0,0,1.541-10.4L13.5,10.856V5h1.187A2.316,2.316,0,0,1,17,7.313V8A1.5,1.5,0,0,0,18.5,9.5Zm-3.118,4.979a2.314,2.314,0,0,1-.7,4.521H13.5V13.965ZM10.5,10.035,8.618,9.521A2.314,2.314,0,0,1,9.313,5H10.5Z"
                        />
                      </svg>

                    </Link>
                    <Link
                      to={userSesion ?"#" :`/vita/residente/editar/${params.id}`}

                    >
                      <svg
                        className="w-9 h-9 md:w-11 md:h-11 pl-3 fill-gray-400 transition transform hover:scale-125 motion-reduce:transition-none motion-reduce:hover:transform-none hover:fill-blue-006"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        >
                          <path
                            d="M1.172,19.119A4,4,0,0,0,0,21.947V24H2.053a4,4,0,0,0,2.828-1.172L18.224,9.485,14.515,5.776Z"
                          />
                          <path
                            d="M23.145.855a2.622,2.622,0,0,0-3.71,0L15.929,4.362l3.709,3.709,3.507-3.506A2.622,2.622,0,0,0,23.145.855Z"
                          />
                      </svg>

                    </Link>
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

        <div className="p-5">
        <form
            className="grid grid-cols-3 gap-2 basis-6/7 md:basis-5/6 bg-slate-50 shadow rounded-lg p-5"
        >
                <div className="col-start-1 col-end-4">
                  {msg && <Alerta alerta={alerta} />}
                </div>
                <div className="pt-2 ">
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="nombres"
                    >Nombre(s)</label>
                    <input
                        id="nombres"
                        type="text"
                        placeholder="Nombre(s)"
                        className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={nombres}
                        disabled={true}
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
                        value={apellidoP}
                        disabled={true}
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
                        value={apellidoM}
                        disabled={true}
                    />
                </div>
                <div className='pt-2'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="fecha-ingreso"
                    >Fecha ingreso</label>

                    <input
                        id="fecha-ingreso"
                        type="date"
                        className="w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={fechaIngreso?.split('T')[0]}
                        disabled={true}
                    />
                </div>
                <div className='pt-2'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="fecha-entrega"
                    >Fecha nacimiento</label>

                    <input
                        id="fecha-entrega"
                        type="date"
                        className="w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={fechaNacimiento?.split('T')[0]}
                        disabled={true}
                    />
                </div>
                <div className="pt-2">
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="edad"
                    >Edad</label>
                    <input
                        id="edad"
                        type="text"
                        placeholder="edad"
                        maxLength="3"
                        className="capitalize w-2/3 mt-1 p-1 border rounded-xl bg-gray-100"
                        value={edad}
                        disabled={true}
                    />
                </div>
                <div className='pt-2 pb-9 col-span-2 w-4/5 md:w-3/5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="padecimiento"
                    >Padecimiento</label>

                    <textarea
                        id="padecimiento"
                        placeholder="Padecimiento del residente"
                        className="capitalize w-full h-28 md:h-44 mt-1 p-1 border rounded-xl bg-gray-100"
                        value={padecimiento}
                        disabled={true}
                    />
                </div>
                <div className="pt-2">
                      <label
                          className="uppercase text-gray-600 font-bold block text-sm"
                      >Estado:</label>
                      <ul className="pb-5">
                       {estados.map((elemento, index, array) => {
                           return (
                           <li key={index}>
                               <div >
                                 <input
                                   type="checkbox"
                                   id={`custom-checkbox-${index}`}
                                   name={elemento}
                                   value={ elemento}
                                   checked={checkedState[index]}
                                   onChange={() => handleOnChange(index)}
                                   disabled={true}
                                 />
                                 <label htmlFor={`custom-checkbox-${index}`}>{elemento}</label>
                               </div>
                           </li>
                         );
                       })}
                     </ul>

                     <label
                         className="text-gray-700 uppercase font-bold text-sm"
                         htmlFor="fecha-egreso"
                     >Fecha Egreso</label>
                     <input
                         id="fecha-egreso"
                         type="date"
                         className="w-full mt-1 p-1 border rounded-xl bg-gray-100"
                         value={fechaEgreso===null ?'' :fechaEgreso?.split('T')[0]}
                         disabled={true}
                     />
                     <label
                         className="uppercase text-gray-600 font-bold block text-sm pt-4"
                         htmlFor="motivo-inactivo"
                     >Motivo de inactivo</label>
                     <input
                         id="motivo-inactivo"
                         type="text"
                         placeholder="Motivo Inactivo"
                         maxLength="20"
                         className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                         value={motivoInactivo===null ?'' :motivoInactivo}
                         disabled={true}
                     />
                </div>
                <h2 className="uppercase col-span-3 text-sm text-blue-006 font-black">Datos de emergencia</h2>
                <div>
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="nombresemer"
                    >Nombre(s)</label>
                    <input
                        id="nombresemer"
                        type="text"
                        placeholder="Nombre(s)"
                        className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={datosEmergNombres}
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="apellidopaternoemer"
                    >Apellido paterno</label>
                    <input
                        id="apellidopaternoemer"
                        type="text"
                        placeholder="Apellido Paterno"
                        className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={datosEmergApellidoP}
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="apellidomaternoemer"
                    >Apellido materno</label>
                    <input
                        id="apellidomaternoemer"
                        type="text"
                        placeholder="Apellido Materno"
                        className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={datosEmergApellidoM}
                        disabled={true}
                    />
                </div>
                <div className="pt-2">
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="parentezco"
                    >Parentesco</label>
                    <input
                        id="parentezco"
                        type="text"
                        placeholder="Parentezco"
                        className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={datosEmergParentezco}
                        disabled={true}
                    />
                </div>
                <div className="pt-2">
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="tel1"
                    >Núm. Tel.(1)</label>
                    <input
                        id="tel1"
                        type="tel"
                        placeholder="xxxxxxxxxx"
                        maxLength="10"
                        className="uppercase w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={datosEmergTel1}
                        disabled={true}
                    />
                </div>
                <div className="pt-1.5">
                    <label
                        className="uppercase text-gray-600 font-bold block text-sm"
                        htmlFor="tel2"
                    >Núm. Tel.(2)</label>
                    <input
                        id="tel2"
                        type="tel"
                        placeholder="xxxxxxxxxx"
                        maxLength="10"
                        className="uppercase w-full mt-1 p-1 border rounded-xl bg-gray-100"
                        value={datosEmergTel2}
                        disabled={true}
                    />
                </div>
          </form>
          <form
            className=" mt-3 grid grid-cols-1 gap-2 basis-6/7 md:basis-5/6 bg-slate-50 shadow rounded-lg p-5"
          >
              {Object.keys(medicamento).length === 0 ?
                <p className="text-center text-blue-354 uppercase p-3">No hay Medicamentos</p>

              : <PreviewMedicamento
                  key={medicamento.residente_idResidente}
                  medicamento={medicamento}
              />}
          </form>
        </div>
      </div>
  )
}
export default Residente
