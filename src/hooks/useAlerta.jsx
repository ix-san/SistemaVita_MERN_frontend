import {useContext} from 'react'
import AlertContext from '../context/AlertaProvider'

const useAlerta = () => {
  return useContext(AlertContext)
}

export default useAlerta;
