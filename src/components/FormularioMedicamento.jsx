import {useState, useEffect} from 'react'
import useAlerta from '../hooks/useAlerta'
import {useParams} from 'react-router-dom'
import useResidentes from '../hooks/useResidentes'
import Alerta from './Alerta'

const FormularioMedicamento = () => {

  const [residente_idResidente, setResidente_idResidente]= useState('')
  const [desayuno, setDesayuno]= useState('')
  const [comida, setComida]= useState('')
  const [cena, setCena]= useState('')
  const [notas, setNotas]= useState('')
  const [datemodificacion, setDatemodificacion]= useState('')
  const [selectInactivo, setSelectInactivo] = useState(false)

  const {mostrarAlerta, alerta} = useAlerta();

  const params = useParams()
  const {residente, cargarMedicamento, medicamento, cargando} = useResidentes();

  const {estado} = residente

  useEffect(() => {
    if (estado === 'activo') {
      setResidente_idResidente(medicamento.residente_idResidente)
      setDesayuno(medicamento.desayuno)
      setComida(medicamento.comida)
      setCena(medicamento.cena)
      setNotas(medicamento.notas)
    }
    if (estado === 'inactivo'){
      setSelectInactivo(true)
    }
  }, [estado])

  const handleSubmit = async e => {
    e.preventDefault();

    if (selectInactivo) {
      mostrarAlerta({
        msg: 'No Se Puede Cargar El Medicamento De Un Residente Inactivo',
        error: true
      })
      return
    }
    if([desayuno, comida, cena, notas].includes('')){
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    await cargarMedicamento({residente_idResidente: params.id, desayuno, comida, cena, notas})

    setDesayuno('')
    setComida('')
    setCena('')
    setNotas('')

}

  const {msg} = alerta

  if(cargando) return 'cargado..'

  return(
      <form
        className="grid grid-cols-1 gap-2 basis-6/7 md:basis-5/6 bg-slate-50 shadow rounded-lg p-5"
        onSubmit={handleSubmit}
      >
            <div className="col-start-1 col-end-4">
              {msg && <Alerta alerta={alerta} />}
            </div>
            <div className='grid grid-rows-3 grid-flow-col gap-2'>
                <div className='w-6/7'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="padecimiento"
                    >Desayuno</label>
                    <textarea
                        id="padecimiento"
                        placeholder="Desayuno del residente"
                        maxLength="70"
                        className="capitalize w-full mt-1 p-2.5 border rounded-xl bg-gray-100"
                        value={desayuno}
                        onChange={e => setDesayuno(e.target.value)}
                        disabled={selectInactivo ?true :false}
                    />
                </div>
                <div className='w-6/7'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="padecimiento"
                    >Comida</label>
                    <textarea
                        id="padecimiento"
                        placeholder="Comida del residente"
                        maxLength="70"
                        className="capitalize w-full mt-1 p-2.5 border rounded-xl bg-gray-100"
                        value={comida}
                        onChange={e => setComida(e.target.value)}
                        disabled={selectInactivo ?true :false}
                    />
                </div>
                <div className='w-6/7'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="padecimiento"
                    >Cena</label>
                    <textarea
                        id="padecimiento"
                        placeholder="Cena del residente"
                        maxLength="70"
                        className="capitalize w-full mt-1 p-2.5 border rounded-xl bg-gray-100"
                        value={cena}
                        onChange={e => setCena(e.target.value)}
                        disabled={selectInactivo ?true :false}
                    />
                </div>
                <div className='w-6/7 row-span-2 col-span-2 pl-2'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="padecimiento"
                    >Notas</label>
                    <textarea
                        id="padecimiento"
                        placeholder="Notas del residente"
                        maxLength="140"
                        className="capitalize w-full h-2/3 mt-1 p-1 border rounded-xl bg-gray-100"
                        value={notas}
                        onChange={e => setNotas(e.target.value)}
                        disabled={selectInactivo ?true :false}
                    />
                </div>
                </div>
            <input
                type="submit"
                value= 'Cargar Medicamentos'
                className='bg-sky-600 mt-2 col-start-1 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors overflow-y-auto'
            />
      </form>
  )
}

export default FormularioMedicamento
