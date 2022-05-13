import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import useAlerta from '../hooks/useAlerta'
import useResidentes from '../hooks/useResidentes'
import Alerta from './Alerta'

const FormularioPago = () => {

  const [residente_idResidente, setResidente_idResidente]= useState('')
  const [cantidad, setCantidad]= useState('')
  const [fecharealizo, setFecharealizo]= useState('')
  const [selectInactivo, setSelectInactivo] = useState(false)

  const {mostrarAlerta, alerta} = useAlerta();
  const {nuevoPago, residente} = useResidentes();

  const params = useParams()

  const {estado} = residente

  useEffect(() => {
    if (estado === 'inactivo'){
      setSelectInactivo(true)
    }
  }, [estado])

  const handleSubmit = async e => {
    e.preventDefault();

    if (selectInactivo) {
      mostrarAlerta({
        msg: 'No Se Puede Cargar El Pago De Un Residente Inactivo',
        error: true
      })
      return
    }
    if ([cantidad, fecharealizo].includes(''))
    {
      mostrarAlerta({
        msg: 'Todos Los Campos Son Obligatorios',
        error: true
      })
      return
    }

    //Pasar los datos el Provider
    await nuevoPago({residente_idResidente: params.id, cantidad, fecharealizo})

    setCantidad('')
    setFecharealizo('')

  }

  const {msg} = alerta


  return(
    <form
      className="grid grid-cols-1 gap-2 basis-6/7 md:basis-5/6 bg-slate-50 shadow rounded-lg p-5"
      onSubmit={handleSubmit}
    >
          <div className="col-start-1 col-end-4">
            {msg && <Alerta alerta={alerta} />}
          </div>
          <div className='grid grid-rows-3 grid-flow-col gap-2'>
              <div className="pt-2">
                  <label
                      className="uppercase text-gray-600 font-bold block text-sm"
                      htmlFor="monto"
                  >Monto</label>
                  <input
                      id="monto"
                      type="text"
                      placeholder="monto"
                      maxLength="5"
                      className="capitalize w-2/3 md:w-2/3 mt-1 p-1 border rounded-xl bg-gray-100"
                      value={cantidad}
                      onChange={e => setCantidad(e.target.value)}
                      disabled={selectInactivo ?true :false}
                  />
              </div>
              <div className='pt-2'>
                  <label
                      className="text-gray-700 uppercase font-bold text-sm"
                      htmlFor="fecha-pago"
                  >Fecha de pago</label>

                  <input
                      id="fecha-pago"
                      type="date"
                      className="w-full mt-1 p-1 border rounded-xl bg-gray-100"
                      value={fecharealizo}
                      onChange={e => setFecharealizo(e.target.value)}
                      disabled={selectInactivo ?true :false}
                  />
              </div>
          </div>

          <input
              type="submit"
              value= 'Cargar Pago'
              className='bg-sky-600 mt-2 col-start-1 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors overflow-y-auto'
          />
    </form>
  )
}

export default FormularioPago
