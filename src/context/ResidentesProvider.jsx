import {useState, useEffect, createContext} from 'react'
import useAlerta from '../hooks/useAlerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'
import {useNavigate} from 'react-router-dom'

const ResidentesContext = createContext();

const ResidentesProvider = ({children}) =>{

  const [residentes, setResidentes] = useState([]);
  const [residentesActivos, setResidentesActivos] = useState([]);
  const [residentesInactivos, setResidentesInactivos] = useState([]);
  const [residentesTodos, setResidentesTodos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [pagosMonto, setPagosMonto] = useState([]);
  const [pagosMontoActivo, setPagosMontoActivo] = useState([]);
  const [pagosMontoInactivo, setPagosMontoInactivo] = useState([]);
  const [residente, setResidente] = useState({});
  const [medicamento, setMedicamento] = useState({});
  const [pago, setPago] = useState({});
  const [cargando, setCargando] = useState(false);
  const [residenteBuscar, setResidentesBuscar] = useState([]);
  const [pagosBuscar, setPagosBuscar] = useState([]);
  const [pagosMontoBuscar, setPagosMontoBuscar] = useState([]);

  const {mostrarAlerta, alerta} = useAlerta({});
  const {auth} = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
      const obtenerResidentes = async () => {
        setCargando(true)
        try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }
          const {data} = await clienteAxios('/residente', config)
          setResidentes(data.listaResidentes)
          setResidentesActivos(data.listaActivos.length)
          setResidentesInactivos(data.listaInactivos.length)
          setResidentesTodos(data.listaResidentes.length)

        } catch (error) {
          console.log(error)
        } finally{
          setCargando(false)
        }
      }

      const obtenerPagos = async () => {
        setCargando(true)
        try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }
          const {data} = await clienteAxios('/pago', config)

          const cantidadActivo = data.listaPagoMontoActivos.cantidadActivoInactivo
          const cantidadInactivo = data.listaPagoMontoInactivos.cantidadActivoInactivo

          setPagos(data.listaPago)
          setPagosMonto(data.listaPagoMonto)
          setPagosMontoActivo({cantidadActivo: cantidadActivo})
          setPagosMontoInactivo({cantidadInactivo: cantidadInactivo})

        } catch (error) {
          console.log(error)
        } finally{
          setCargando(false)
        }
      }

      obtenerResidentes()
      obtenerPagos()
  }, [auth])

  const submitResidente = async residente => {
    if(residente.idResidente){
      await editarResidente(residente)
    }else {
      await nuevoResidente(residente)
    }
  }

const editarResidente = async residenteEdit => {

  try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }
      const {data} = await clienteAxios.put(`/residente/${residenteEdit.idResidente}`, residenteEdit, config)

      //Sincronizar el state
      const {estado} = data

      var {cantidadTotal} = pagosMonto
      var {cantidadActivo} = pagosMontoActivo

      const residentesActualizados = await residentes.map(residenteState  => residenteState.idResidente === data.idResidente ? data : residenteState)
      const pagosActualizados = await pagos.map(pagoState  => pagoState.residente_idResidente === data.idResidente ? {...pagoState, estado: data.estado} : pagoState)
      setResidentes(residentesActualizados)
      setPagos(pagosActualizados)

        if (data.estado.toString().toLowerCase() !== 'activo')
        {
          if(data.estado.toString().toLowerCase() === 'inactivo')
          {
            const residentesActivosActualizados = residentesActivos -1
            const residentesInactivosActualizados = residentesInactivos +1
            setResidentesActivos(residentesActivosActualizados)
            setResidentesInactivos(residentesInactivosActualizados)

            const montoPagosInactivosFiltrado = await pagosActualizados.filter(pagoState => pagoState.estado.toString().toLowerCase() === 'inactivo')
            const pagosMontoInactivo = await montoPagosInactivosFiltrado.map(pagoSatate => parseInt(pagoSatate.cantidad))
            var totalInactivo = 0
            pagosMontoInactivo.map(numero => totalInactivo += numero )
            setPagosMontoInactivo({cantidadInactivo: totalInactivo})

            const montoPagosActivosFiltrado = await pagosActualizados.filter(pagoState => pagoState.estado.toString().toLowerCase() === 'activo')
            const pagosMontoActivo = await montoPagosActivosFiltrado.map(pagoSatate => parseInt(pagoSatate.cantidad))
            var totalActivo = 0
            pagosMontoActivo.map(numero => totalActivo += numero )
            setPagosMontoActivo({cantidadActivo: totalActivo})

          }
        }

      mostrarAlerta({
        msg: 'Residente Actualizado Correctamente',
        error: false
      })

      setTimeout(() => {
          mostrarAlerta({})
          navigate('/vita/lista-residentes')
      },3000);

  } catch (error) {
    mostrarAlerta({
      msg: error.response.data.msg,
      error: true
    })
    setTimeout(() => {
        mostrarAlerta({})
        navigate(`/vita/lista-residentes/residente/${medicamento.residente_idResidente}`)
    },2000);
  }
}

const nuevoResidente = async residente => {
    try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/residente', residente, config)
            setResidentes([...residentes, data])

            const residentesActivosActializados = residentesActivos +1
            const residentesTodosActializados = residentesTodos +1

            setResidentesActivos(residentesActivosActializados)
            setResidentesTodos(residentesTodosActializados)

            mostrarAlerta({
              msg: 'Residente Creado Correctamente',
              error: false
            })

            setTimeout(() => {
                mostrarAlerta({})
                navigate('/vita/lista-residentes')
            },3000);

    } catch (error) {
            mostrarAlerta({
              msg: error.response.data.msg,
              error: true
            })
    }
}

  const obtenerResidente = async id => {
    mostrarAlerta({})
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }

      const {data} = await clienteAxios(`/residente/${id}`, config)
        setResidente(data)
    } catch (error) {
        console.log(error);
    } finally {
      setCargando(false)
    }
  }

  const eliminarResidente = async id => {
    const {estado} = residente
    try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }
          const {data} = await clienteAxios.delete(`/residente/${id}`, config)

          //Sicronizar el state residente
          const residentesActualizados = residentes.filter(residenteState  => residenteState.idResidente != id)
          setResidentes(residentesActualizados)

          const residentesTodosActializados = residentesTodos -1
          setResidentesTodos(residentesTodosActializados)

          const pagosActualizados = pagos.filter(pagoState  => pagoState.residente_idResidente != id)
          setPagos(pagosActualizados)

          const pagosMontoActualizadoArray = pagosActualizados.map(montoState => parseInt(montoState.cantidad))
          var total = 0
          pagosMontoActualizadoArray.map(numero => total += numero )
          setPagosMonto({cantidadTotal: total})

          if (estado.toLowerCase() === 'activo')
          {
            const residentesActivosActializados = residentesActivos -1
            setResidentesActivos(residentesActivosActializados)

            const montoPagosActivosFiltrado = await pagosActualizados.filter(pagoState => pagoState.estado.toString().toLowerCase() === 'activo')
            const pagosMontoActivo = await montoPagosActivosFiltrado.map(pagoSatate => parseInt(pagoSatate.cantidad))
            var totalActivo = 0
            pagosMontoActivo.map(numero => totalActivo += numero )
            setPagosMontoActivo({cantidadActivo: totalActivo})
          }
          if (estado.toLowerCase() === 'inactivo')
          {
            const residentesInactivosActializados = residentesInactivos -1
            setResidentesInactivos(residentesInactivosActializados)

            const montoPagosInactivosFiltrado = await pagosActualizados.filter(pagoState => pagoState.estado.toString().toLowerCase() === 'inactivo')
            const pagosMontoInactivo = await montoPagosInactivosFiltrado.map(pagoSatate => parseInt(pagoSatate.cantidad))
            var totalInactivo = 0
            pagosMontoInactivo.map(numero => totalInactivo += numero )
            setPagosMontoInactivo({cantidadInactivo: totalInactivo})
          }

          mostrarAlerta({
            msg: data.msg,
            error: false
          })

          setTimeout(() => {
              mostrarAlerta({})
              navigate('/vita/lista-residentes')
          },3000);

    } catch (error) {
          mostrarAlerta({
            msg: error.response.data.msg,
            error: true
          })
    }
  }

  const obtenerMedicamento = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }

      const {data} = await clienteAxios(`/pill/${id}`, config)
      setMedicamento(data)

      mostrarAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {

      setMedicamento({})
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true
      })
    } finally {
      setCargando(false)
    }
  }

const cargarMedicamento = async medicamento => {
  try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }

      const {data} = await clienteAxios.post('/pill', medicamento, config)

      setMedicamento(data)

      mostrarAlerta({
        msg: 'Medicamentos Cargados Correctamente',
        error: false
      })

      setTimeout(() => {
          mostrarAlerta({})
          navigate(`/vita/lista-residentes/residente/${medicamento.residente_idResidente}`)
      },3000);

  } catch (error) {
    mostrarAlerta({
      msg: error.response.data.msg,
      error: true
    })

    setTimeout(() => {
        mostrarAlerta({})
        navigate(`/vita/lista-residentes/residente/${medicamento.residente_idResidente}`)
    },2000);
  }
}

const obtenerPago = async id => {
  setCargando(true)
  try {
    const token = localStorage.getItem('token')
    if(!token) return

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const {data} = await clienteAxios(`/pago/${id}`, config)
      setPago(data)
  } catch (error) {
    mostrarAlerta({
      msg: error.response.data.msg,
      error: true
    })
  } finally {
    setCargando(false)
  }
}

const nuevoPago = async pago =>{
  try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }

      const {data} = await clienteAxios.post('/pago', pago, config)

      //sincronizar el state
      const {cantidad} = data
      setPagos([...pagos, data])

      var {cantidadTotal} = pagosMonto
      var {cantidadActivo} = pagosMontoActivo

      const montoTotalActualizado = parseInt(cantidadTotal) + parseInt(data.cantidad)
      const montoActivoActualizado = parseInt(cantidadActivo) + parseInt(data.cantidad)

      setPagosMonto({cantidadTotal: montoTotalActualizado.toString()})
      setPagosMontoActivo({cantidadActivo: montoActivoActualizado.toString()})

      mostrarAlerta({
        msg: 'Pago Agregado Correctamente',
        error: false
      })

      setTimeout(() => {
          mostrarAlerta({})
          navigate('/vita/lista-pagos')
      },3000);

  } catch (error) {
    mostrarAlerta({
      msg: error.response.data.msg,
      error: true
    })

    setTimeout(() => {
        mostrarAlerta({})
        navigate(`/vita/lista-residentes/residente/${medicamento.residente_idResidente}`)
    },2000);
  }
}

const eliminarpago = async id => {
  try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await clienteAxios.delete(`/pago/${id}`, config)
        //Sicronizar el state
        const pagosActualizados = pagos.filter(pagoState  => pagoState.idPago != id)
        setPagos(pagosActualizados)

        const pagosMontoActualizadoArray = pagosActualizados.map(montoState => parseInt(montoState.cantidad))
        var total = 0
        pagosMontoActualizadoArray.map(numero => total += numero )
        setPagosMonto({cantidadTotal: total})

        mostrarAlerta({
          msg: data.msg,
          error: false
        })

        setTimeout(() => {
            mostrarAlerta({})
            navigate('/vita/lista-pagos')
        },3000);

  } catch (error) {
        mostrarAlerta({
          msg: error.response.data.msg,
          error: true
        })
  }
}

  const submitFechas = async datos => {
    const {selectEstado} = datos
    if (selectEstado === 'todos') {
        fechasTodos(datos)
    } else {
        fechasActivoInactivo(datos)
    }
  }

  const fechasActivoInactivo = async datos => {
    const {selectEstado} = datos
    setCargando(true)
      try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }

          const {data} = await clienteAxios.post('/pago/fechasActivoInactivo', datos, config)
          setPagos(data.listaPagosBuscadorAI)
          setPagosMonto(data.montoFechasAI)

          if (selectEstado.toLowerCase() === 'activo') {
            setPagosMontoActivo({cantidadActivo: data.montoFechasAI.cantidadTotal})
            setPagosMontoInactivo({cantidadInactivo: null})
          }
          if (selectEstado.toLowerCase() === 'inactivo') {
            setPagosMontoActivo({cantidadActivo: null})
            setPagosMontoInactivo({cantidadInactivo: data.montoFechasAI.cantidadTotal})
          }

      } catch (error) {
          mostrarAlerta({
            msg: error.response.data.msg,
            error: true
          })
      } finally{
        setCargando(false)
      }
  }

  const fechasTodos = async datos => {
    const {selectEstado} = datos
    setCargando(true)
      try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }

          const {data} = await clienteAxios.post('/pago/fechasTodos', datos, config)
          setPagos(data.listaPagosBuscadorTodos)
          setPagosMonto(data.montoFechasTodos)

          const montoPagosActivosFiltrado = await data.listaPagosBuscadorTodos.filter(pagoState => pagoState.estado.toString().toLowerCase() === 'activo')
          const pagosMontoActivo = await montoPagosActivosFiltrado.map(pagoSatate => parseInt(pagoSatate.cantidad))
          var totalActivo = 0
          pagosMontoActivo.map(numero => totalActivo += numero )
          setPagosMontoActivo({cantidadActivo: totalActivo})

          const montoPagosInactivosFiltrado = await data.listaPagosBuscadorTodos.filter(pagoState => pagoState.estado.toString().toLowerCase() === 'inactivo')
          const pagosMontoInactivo = await montoPagosInactivosFiltrado.map(pagoSatate => parseInt(pagoSatate.cantidad))
          var totalInactivo = 0
          pagosMontoInactivo.map(numero => totalInactivo += numero )
          setPagosMontoInactivo({cantidadInactivo: totalInactivo})


      } catch (error) {
        mostrarAlerta({
          msg: error.response.data.msg,
          error: true
        })
      } finally{
        setCargando(false)
      }
  }

  const submitBuscandorResidente = async name => {
    setCargando(true)
    try {

      const residenteFiltrado = residentes.filter(residenteState => residenteState.nombreCompleto.toString().toLowerCase().includes(name.buscadorResi.toLowerCase()))
      setResidentesBuscar(residenteFiltrado)

      const pagoFiltrado = pagos.filter(pagoState => pagoState.nombreCompleto.toString().toLowerCase().includes(name.buscadorResi.toLowerCase()))
      setPagosBuscar(pagoFiltrado)

      const pagoMontoFiltrado = pagoFiltrado.map(montoState => parseInt(montoState.cantidad))
      var total = 0
      pagoMontoFiltrado.map(numero => total += numero )
      setPagosMontoBuscar({cantidad: total})

      if (residenteFiltrado.length === 0) {
        mostrarAlerta({
          msg: 'Residente No Encontrado',
          error: true
        })
      }

    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true
      })
    } finally {
      setCargando(false)
    }
  }

  const listaResidentesEstado = async datos => {
    const {selectEstado} = datos
    if (selectEstado === 'todos') {
        listaTodos(datos)
    } else {
        listaActivoInactivo(datos)
    }
  }

  const listaTodos = async datos => {
    setCargando(true)
      try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }

          const {data} = await clienteAxios.post('/residente/listaTodos', datos, config)
          setResidentes(data.listaResidentes)
          setResidentesActivos(data.listaActivos.length)
          setResidentesInactivos(data.listaInactivos.length)
          setResidentesTodos(data.listaResidentes.length)


      } catch (error) {
        mostrarAlerta({
          msg: error.response.data.msg,
          error: true
        })
      } finally{
        setCargando(false)
      }
  }

  const listaActivoInactivo = async datos => {
    const {selectEstado} = datos
    setCargando(true)
      try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }

          const {data} = await clienteAxios.post('/residente/listaActivoInactivo', datos, config)
          setResidentes(data)

          if (selectEstado === 'activo') {
            setResidentesActivos(data.length)
            setResidentesInactivos(null)
            setResidentesTodos(data.length)
          }
          if (selectEstado === 'inactivo') {
            setResidentesActivos(null)
            setResidentesInactivos(data.length)
            setResidentesTodos(data.length)
          }

      } catch (error) {
        mostrarAlerta({
          msg: error.response.data.msg,
          error: true
        })
      } finally{
        setCargando(false)
      }
  }

  const cerrarSesionResidente = () => {
    setResidentes({})
    setResidentesActivos([])
    setResidentesInactivos([])
    setResidentesTodos([])
    setResidente({})
    setMedicamento({})

    setPagos([])
    setPagosMonto([])
    setPago({})
  }

  return(
    <ResidentesContext.Provider
      value={{
        residentes,
        residentesActivos,
        residentesInactivos,
        residentesTodos,
        submitResidente,
        obtenerResidente,
        residente,
        cargando,
        eliminarResidente,
        obtenerMedicamento,
        medicamento,
        cargarMedicamento,
        pagos,
        pagosMonto,
        pagosMontoActivo,
        pagosMontoInactivo,
        obtenerPago,
        nuevoPago,
        pago,
        eliminarpago,
        submitFechas,
        submitBuscandorResidente,
        residenteBuscar,
        pagosBuscar,
        pagosMontoBuscar,
        listaResidentesEstado,
        cerrarSesionResidente
      }}
    >{children}

    </ResidentesContext.Provider>
  )
}
 export {
   ResidentesProvider
 }

export default ResidentesContext
