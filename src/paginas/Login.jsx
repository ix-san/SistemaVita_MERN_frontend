import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth';

const Login = () => {

  const [username, setUserName] = useState('')
  const [userpassword, setUserPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth();

  const navigate = useNavigate()

  const handleSubmit = async e =>{
    e.preventDefault();

    if([username, userpassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }
    try {
      const {data} = await clienteAxios.post('/usuario/login', {username, userpassword})
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/vita')

      setTimeout(() => {
        location.reload()
      },1000)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlerta({})
        setUserName('')
        setUserPassword('')
      },3000)
    }

  }

  const {msg} = alerta
  return(
    <>
      <form
        className="my-5 bg-slate-50 shadow rounded-lg p-12"
        onSubmit={handleSubmit}
      >

          <h1 className="text-blue-006 font-black text-4xl capitalize">Iniciar sesión {''}
            <span className="flex flex-col text-slate-700 text-2xl">casa de descanso vita</span>
          </h1>

            {msg && <Alerta alerta={alerta} />}

            <div className="my-12">
                <label
                    className="uppercase text-gray-600 block text-base font-bold"
                    htmlFor="username"
                >Usuario</label>
                <input
                    id="username"
                    type="text"
                    placeholder="usuario"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label
                    className="uppercase text-gray-600 block text-base font-bold"
                    htmlFor="password"
                >Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
                    value={userpassword}
                    onChange={e => setUserPassword(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-blue-354 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />

        </form>
    </>
  )
}

export default Login
