import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useUsuarios from '../hooks/useUsuarios'
import useResidentes from '../hooks/useResidentes'
import useAlerta from '../hooks/useAlerta'

const Header = () => {
  const {auth, cerrarSesionAuth} = useAuth()
  const {cerrarSesionUsuario} = useUsuarios()
  const {cerrarSesionResidente} = useResidentes()
  const {cerrarSesionAlerta} = useAlerta()


  const refreshPage = () => {
    location.reload()
  };

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionUsuario()
    cerrarSesionResidente()
    cerrarSesionAlerta()
    localStorage.removeItem('token')
  }

  return(
    <header className="relative flex flex-row px-3 py-1 bg-blue-485 border-b">
      <div className='md:flex w-20 py-2 md:w-3/4 md:pl-2'>

      <Link
          to="/vita"
          className='font-bold uppercase'
          onClick={refreshPage}
          >
          <svg
            className="w-20 h-20 fill-white transition transform hover:scale-110 motion-reduce:transition-none motion-reduce:hover:transform-none hover:fill-sky-cdc"
            xmlns="http://www.w3.org/2000/svg"
             width="332.000000pt" height="345.000000pt" viewBox="0 0 332.000000 345.000000"
             preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,345.000000) scale(0.100000,-0.100000)" >
            <path d="M1562 3237 c-53 -45 -302 -255 -553 -468 -251 -213 -468 -394 -482 -404 -15 -9 -27 -21 -27 -25 0 -5 43 -6 95 -3 l95 6 1 -89 c2 -206 16 -590 23 -604 7 -14 900 -581 938 -595 11 -5 147 81 426 268 420 282 572 390 572 409 0 6 -10 8 -23 4 -13 -3 -113 -6 -222 -7 l-200 -1 -229 -154 c-126 -85 -233 -154 -237 -154 -10 0 -579 356 -597 374 -9 9 -14 85 -18 286 l-5 275 381 354 c290 269 380 358 378 374 -3 19 -181 219 -206 231 -7 3 -55 -31 -110 -77z"/>
              <path d="M1965 2568 c-115 -332 -266 -695 -296 -714 -16 -9 -10 45 36 331 25 154 45 293 45 308 0 33 -42 80 -68 75 -14 -3 -26 -57 -73 -358 -51 -318 -56 -358 -44 -387 9 -21 23 -35 42 -40 44 -11 100 -7 125 9 25 17 142 258 243 504 76 183 81 203 61 242 -20 39 -62 56 -71 30z"/>
              <path d="M2905 1640 c-56 -9 -105 -32 -167 -78 -29 -21 -249 -171 -488 -332 -239 -161 -438 -297 -442 -303 -4 -6 3 -27 14 -45 27 -43 36 -162 18 -218 -14 -42 -89 -128 -132 -150 -46 -24 -119 -35 -169 -26 -32 6 -124 57 -314 172 -298 182 -325 202 -325 234 0 29 30 56 61 56 15 0 138 -72 303 -176 153 -97  294 -181 312 -186 75 -20 156 27 193 113 36 82 10 154 -79 217 -118 85 -947 607 -985 620 -38 14 -57 12 -365 -42 -179 -31 -328 -56 -332 -56 -5 0 -8 -189 -8 -419 l0 -420 28 9 c15 5 81 18 147 29 119 21 119 21 153 1 19 -11 239 -146 490 -299 252 -153 473 -286 492 -296 56 -29 152 -25 220 9 30 16 69 40 85 56 31 28 479 331 505 342 23 9 980 652 1019 685 48 39 93 138 93 206 1 121 -58 223 -155 267 -70 32 -114 39 -172 30z"/>
            </g>
          </svg>

      </Link>
      </div>
      <div className='flex flex-col md:flex-row sm:items-center sm:absolute inset-y-14 left-28 md:left-20 md:px-7 pt-4 sm:py-2 md:gap-4'>
      <p className=' text-xl font-bold text-white align-bottom pr-5'>Hola: {auth.username}</p>
      </div>

            <div className='flex flex-col sm:flex-row items-center sm:gap-4 sm:absolute md:inset-y-8 pt-4 sm:py-5 pl-9 right-5'>
              <Link
                  to="buscar"
                  type="button"
                  className='text-white font-bold text-base uppercase transition transform hover:scale-95 motion-reduce:transition-none motion-reduce:hover:transform-none'
              >Buscar Residente</Link>
              <button
                  type="button"
                  className="text-white font-bold text-base uppercase pl-2 border-l-8 border-indigo-500 transition transform hover:scale-95 motion-reduce:transition-none motion-reduce:hover:transform-none"
                  onClick={handleCerrarSesion}
              >Cerrar Sesión</button>
            </div>
    </header>
  )
}

export default Header
