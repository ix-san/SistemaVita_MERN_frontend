import {useState, useEffect} from 'react'
import useAlerta from '../hooks/useAlerta'
import {useParams} from 'react-router-dom'
import useResidentes from '../hooks/useResidentes'
import Alerta from './Alerta'

const FormularioResidente = () => {

  const estados = ['activo', 'inactivo']
  const [idResidente, setIdResidente] = useState(null)
  const [nombres, setNombres] = useState('')
  const [apellidoP, setApellidoP] = useState('')
  const [apellidoM, setApellidoM] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [edad, setEdad] = useState('')
  const [estado, setEstado] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState('')
  const [fechaEgreso, setFechaEgreso] = useState('')
  const [motivoInactivo, setMotivoInactivo] = useState('')
  const [padecimiento, setPadecimiento] = useState('')
  const [datosEmergNombres, setDatosEmergNombres] = useState('')
  const [datosEmergApellidoP, setDatosEmergApellidoP] = useState('')
  const [datosEmergApellidoM, setDatosEmergApellidoM] = useState('')
  const [datosEmergParentezco, setDatosEmergParentezco] = useState('')
  const [datosEmergTel1, setDatosEmergTel1] = useState('')
  const [datosEmergTel2, setDatosEmergTel2] = useState('')
  const [selectInactivo, setSelectInactivo] = useState(false)
  const [selectFechaInactivo, setSelectFechaInactivo] = useState(true)
  const [checkedStateActivo, setCheckedStateActivo] = useState()
  const [checkedState, setCheckedState] = useState(
    new Array(estados.length).fill(false)
  )

  const {mostrarAlerta, alerta} = useAlerta();
  const {submitResidente, residente} = useResidentes();

  const params = useParams()

  useEffect(() =>{
    if(!params.id){
      setCheckedState([true,false])
      const selectEstado = estados[0]
      setEstado(selectEstado)
    }
  },[params])

  useEffect(() => {
    if(params.id){
      setIdResidente(residente.idResidente)
      setNombres(residente.nombres)
      setApellidoP(residente.apellidoP)
      setApellidoM(residente.apellidoM)
      setFechaNacimiento(residente.fechaNacimiento?.split('T')[0]) //Metodo1
      setEdad(residente.edad)
      setEstado(residente.estado)
      if (residente.estado.toString() === 'activo') {
        setCheckedState([true,false])
      }
      if (residente.estado.toString() === 'inactivo') {
        setCheckedState([false,true])
        setSelectInactivo(true)
      }
      setFechaIngreso(residente.fechaIngreso.substring(0, 10)) //Metodo2
      if (residente.fechaEgreso === null) {
        setFechaEgreso('')
      }else{
        setFechaEgreso(residente.fechaEgreso.substring(0,10))
        setSelectFechaInactivo(false)
        setIdResidente(null)
        setSelectInactivo(false)
      }
      setMotivoInactivo(residente.motivoInactivo)
      if (residente.fechaEgreso === null) {
        setMotivoInactivo('')
      }else{
        setSelectFechaInactivo(false)
        setIdResidente(null)
        setSelectInactivo(false)
      }
      setPadecimiento(residente.padecimiento)
      setDatosEmergNombres(residente.datosEmergNombres)
      setDatosEmergApellidoP(residente.datosEmergApellidoP)
      setDatosEmergApellidoM(residente.datosEmergApellidoM)
      setDatosEmergParentezco(residente.datosEmergParentezco)
      setDatosEmergTel1(residente.datosEmergTel1)
      setDatosEmergTel2(residente.datosEmergTel2)
    }
  }, [params])

  const handleOnChange = (position) => {
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : false
      );
      setCheckedState(updatedCheckedState);

      setSelectInactivo(false)

      const selectEstado = estados[position]
      setEstado(selectEstado)

      if(selectEstado === 'activo'){
        setFechaEgreso('')
        setMotivoInactivo('')
      }
      if(selectEstado === 'inactivo'){
        setSelectInactivo(true)
      }

  };

  const handleSubmit = async e => {
    e.preventDefault();

    const idx = checkedState.indexOf(true);

    if (!selectFechaInactivo) {
      mostrarAlerta({
        msg: 'No Se Puede Editar Un Residente Inactivo',
        error: true
      })
      return
    }
    if ([nombres, apellidoP, apellidoM, fechaNacimiento, edad, fechaIngreso, padecimiento, datosEmergNombres, datosEmergApellidoP, datosEmergApellidoM, datosEmergParentezco, datosEmergTel1, datosEmergTel2].includes(''))
    {
      mostrarAlerta({
        msg: 'Todos Los Campos Son Obligatorios',
        error: true
      })
      return
    }
    if (selectInactivo === true && [fechaEgreso, motivoInactivo].includes(''))
    {
      mostrarAlerta({
        msg: 'Fecha Egreso y Motivo de Inactivo Es Necesario',
        error: true
      })
      return
    }
    if (selectInactivo === true && [motivoInactivo].includes(''))
    {
      mostrarAlerta({
        msg: 'Fecha Egreso y Motivo de Inactivo Es Necesario',
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
    if (edad <1 ) {
      mostrarAlerta({
        msg: 'Edad No Puede Ser De Números Negativos o Cero',
        error: true
      })
      return
    }
    if (datosEmergTel1.length < 10) {
      mostrarAlerta({
        msg: 'El Número Telefonico Debe Ser De 10 Digitos',
        error: true
      })
      return
    }
    if (datosEmergTel2.length < 10 ) {
      mostrarAlerta({
        msg: 'El Número Telefonico Debe Ser De 10 Digitos',
        error: true
      })
      return
    }

    //Pasar los datos el Provider
    if (selectInactivo === true) {
      await submitResidente({idResidente, nombres, apellidoP, apellidoM, fechaNacimiento, edad, estado, fechaIngreso, fechaEgreso, motivoInactivo, padecimiento, datosEmergNombres, datosEmergApellidoP, datosEmergApellidoM, datosEmergParentezco, datosEmergTel1, datosEmergTel2})
    }else{
      await submitResidente({idResidente, nombres, apellidoP, apellidoM, fechaNacimiento, edad, estado, fechaIngreso, padecimiento, datosEmergNombres, datosEmergApellidoP, datosEmergApellidoM, datosEmergParentezco, datosEmergTel1, datosEmergTel2})
    }

      setIdResidente(null)
      setNombres('')
      setApellidoP('')
      setApellidoM('')
      setFechaNacimiento('')
      setEdad('')
      setEstado('')
      setFechaIngreso('')
      setPadecimiento('')
      setDatosEmergNombres('')
      setDatosEmergApellidoP('')
      setDatosEmergApellidoM('')
      setDatosEmergParentezco('')
      setDatosEmergTel1('')
      setDatosEmergTel2('')


  }

  const {msg} = alerta

  return(
    <form
        className="grid grid-cols-3 gap-2 basis-6/7 md:basis-5/6 bg-slate-50 shadow rounded-lg p-5"
        onSubmit={handleSubmit}
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
                    maxLength="30"
                    className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                    value={nombres}
                    onChange={e => setNombres(e.target.value)}
                    disabled={selectFechaInactivo ?false : true}
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
                    maxLength="20"
                    className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                    value={apellidoP}
                    onChange={e => setApellidoP(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    maxLength="20"
                    className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                    value={apellidoM}
                    onChange={e => setApellidoM(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    value={fechaIngreso}
                    onChange={e => setFechaIngreso(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    value={fechaNacimiento}
                    onChange={e => setFechaNacimiento(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    onChange={e => setEdad(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    maxLength="140"
                    className="capitalize w-full h-28 md:h-44 mt-1 p-1 border rounded-xl bg-gray-100"
                    value={padecimiento}
                    onChange={e => setPadecimiento(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                             disabled={idResidente ?false :true}
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
                   value={fechaEgreso}
                   onChange={e => setFechaEgreso(e.target.value)}
                   disabled={selectInactivo ? false : true}
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
                   value={motivoInactivo}
                   onChange={e => setMotivoInactivo(e.target.value)}
                   disabled={selectInactivo ? false : true}
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
                    maxLength="30"
                    className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                    value={datosEmergNombres}
                    onChange={e => setDatosEmergNombres(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    maxLength="20"
                    className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                    value={datosEmergApellidoP}
                    onChange={e => setDatosEmergApellidoP(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    maxLength="20"
                    className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                    value={datosEmergApellidoM}
                    onChange={e => setDatosEmergApellidoM(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    maxLength="10"
                    className="capitalize w-full mt-1 p-1 border rounded-xl bg-gray-100"
                    value={datosEmergParentezco}
                    onChange={e => setDatosEmergParentezco(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    onChange={e => setDatosEmergTel1(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
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
                    onChange={e => setDatosEmergTel2(e.target.value)}
                    disabled={selectFechaInactivo ? false : true}
                />
            </div>

            <input
                type="submit"
                value= {idResidente ? 'Actualizar Residente' : 'Cargar Residente'}
                className='bg-sky-600 mt-2 col-start-1 col-end-4 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors overflow-y-auto'
            />
      </form>
  )
}

export default FormularioResidente
