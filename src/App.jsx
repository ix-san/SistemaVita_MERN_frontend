import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './paginas/Login'
import Vita from './paginas/Vita'
import Buscar from './paginas/Buscar'
import NuevoUsuario from './paginas/NuevoUsuario'
import ListaUsuario from './paginas/ListaUsuario'
import Usuario from './paginas/Usuario'
import NuevoResidente from './paginas/NuevoResidente'
import ListaResidente from './paginas/ListaResidente'
import Residente from './paginas/Residente'
import ListaPagos from './paginas/ListaPagos'
import Pago from './paginas/Pago'
import MedicamentosResidente from './paginas/MedicamentosResidente'
import PagoResidente from './paginas/PagoResidente'
import EditarResidente from './paginas/EditarResidente'

import {AuthProvider} from './context/AuthProvider'
import {AlertaProvider} from './context/AlertaProvider'
import {UsuariosProvider} from './context/UsuariosProvider'
import {ResidentesProvider} from './context/ResidentesProvider'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertaProvider>
          <UsuariosProvider>
            <ResidentesProvider>
                <Routes>
                  <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />}/>
                  </Route>
                  <Route path="/vita" element={<RutaProtegida />}>
                    <Route index element={<Vita/>}/>
                    <Route path="buscar" element={<Buscar />} />
                    <Route path="crear-usuario" element={<NuevoUsuario />} />
                    <Route path="lista-usuario" element={<ListaUsuario />} />
                    <Route path="crear-residente" element={<NuevoResidente />} />
                    <Route path="lista-residentes" element={<ListaResidente />} />
                    <Route path="lista-pagos" element={<ListaPagos />} />
                    <Route path="lista-usuario/:id" element={<Usuario />} />
                    <Route path="lista-residentes/residente/:id" element={<Residente />} />
                    <Route path="buscar/residente/:id" element={<Residente />} />
                    <Route path="lista-pagos/pago/:id" element={<Pago />} />
                    <Route path="buscar/pago/:id" element={<Pago />} />
                    <Route path="/vita/residente/medicamentos/:id" element={<MedicamentosResidente />} />
                    <Route path="/vita/residente/pago/:id" element={<PagoResidente />} />
                    <Route path="/vita/residente/editar/:id" element={<EditarResidente />} />

                  </Route>
                </Routes>
            </ResidentesProvider>
          </UsuariosProvider>
        </AlertaProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
