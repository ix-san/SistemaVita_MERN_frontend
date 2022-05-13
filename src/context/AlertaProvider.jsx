import {useState, createContext} from 'react'

const AlertaContext = createContext();

const AlertaProvider = ({children}) =>{

  const [alerta, setAlerta] = useState([]);

  const mostrarAlerta = alerta => {
    setAlerta(alerta)

    setTimeout(() => {
      setAlerta({})
    },5000)
  }

  const cerrarSesionAlerta = () => {
    setAlerta([])
  }

  return(
    <AlertaContext.Provider
      value={{
          mostrarAlerta,
          alerta,
          cerrarSesionAlerta
        }}
      >{children}
    </AlertaContext.Provider>
  )
}
 export {AlertaProvider}

export default AlertaContext;
