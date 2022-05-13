import {useContext} from 'react'
import ResidentesContext from '../context/ResidentesProvider'

const useResidentes = () => {
  return useContext(ResidentesContext)
}

export default useResidentes;
