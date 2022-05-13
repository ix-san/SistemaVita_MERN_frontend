import {useState} from 'react'
import useAlerta from '../hooks/useAlerta'
import useUsuarios from '../hooks/useUsuarios'
import Alerta from './Alerta'

const FormularioUsuario = () => {

  const [userNames, setUserNames]= useState('')
  const [userApePaterno, setUserApePaterno]= useState('')
  const [userApeMaterno, setUserApeMaterno]= useState('')
  const [username, setUsername]= useState('')
  const [userpassword, setUserpassword]= useState('')
  const [userpasswordRepetir, setUserpasswordRepetir]= useState('')

  const {mostrarAlerta, alerta} = useAlerta();
  const {submitUsuario} = useUsuarios();

  const handleSubmit = async e => {
    e.preventDefault();

    if([userNames, userApePaterno, userApeMaterno, username, userpassword, userpasswordRepetir].includes('')){
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (userpassword !== userpasswordRepetir) {
      mostrarAlerta({
        msg: 'Las contraseñas no son iguales',
        error: true
      })
      return
    }

    if (userpassword.length !== 5) {
      mostrarAlerta({
        msg: 'La contraseña debe ser de 5 caracteres',
        error: true
      })
      return
    }
    //Pasar los datos el Provider
    await submitUsuario({userNames, userApePaterno, userApeMaterno, username, userpassword})

      setUserNames('')
      setUserApePaterno('')
      setUserApeMaterno('')
      setUsername('')
      setUserpassword('')
      setUserpasswordRepetir('')
  }

  const {msg} = alerta

  return(
    <>
      <form
        className="grid grid-cols-3 gap-2 basis-6/7 md:basis-4/5 bg-slate-50 shadow rounded-lg p-5"
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
                    value={userNames}
                    onChange={e => setUserNames(e.target.value)}
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
                    value={userApePaterno}
                    onChange={e => setUserApePaterno(e.target.value)}
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
                    value={userApeMaterno}
                    onChange={e => setUserApeMaterno(e.target.value)}
                />
            </div>
            <div className="my-9 col-start-1 col-end-4">
                <label
                    className="uppercase text-gray-600 font-bold block text-sm"
                    htmlFor="username"
                >Nombre de usuario</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Usuario"
                    maxLength="10"
                    className="w-1/3 mt-1 p-1 border rounded-xl bg-gray-100"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div className="py-2 ">
                <label
                    className="uppercase text-gray-600 font-bold block text-sm"
                    htmlFor="password"
                >Contraseña</label>
                <input
                    id="password"
                    type="password"
                    autoComplete="off"
                    placeholder="contraseña"
                    maxLength="5"
                    className="w-full mt-1 p-1 border rounded-xl bg-gray-100"
                    value={userpassword}
                    onChange={e => setUserpassword(e.target.value)}
                />
            </div>
            <div className="py-2 pb-11 col-start-2 col-end-4">
                <label
                    className="uppercase text-gray-600 font-bold block text-sm"
                    htmlFor="password2"
                >Repetir contraseña</label>
                <input
                    id="password2"
                    type="password"
                    autoComplete="off"
                    placeholder="Repetir contraseña"
                    maxLength="5"
                    className="w-2/3 mt-1 p-1 border rounded-xl bg-gray-100"
                    value={userpasswordRepetir}
                    onChange={e => setUserpasswordRepetir(e.target.value)}
                />
            </div>


            <input
                type="submit"
                value="Cargar Usuario"
                className="bg-sky-600 mb-3 w-full col-start-1 col-end-4 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />

        </form>
    </>
  )
}

export default FormularioUsuario
