import {Link} from 'react-router-dom'

const PreviewPago = ({pago}) => {
  const {idPago, nombreCompleto, cantidad, fecharealizo, estado} = pago
  return (
    <div className='flex flex-col md:flex-row border-b p-1'>
      <p className='md:basis-1/2 text-blue-4f5 text-sm md:text-md font-black capitalize'>
        {nombreCompleto}
      </p>
      <p className='md:basis-1/4 text-blue-4f5 text-sm md:text-md text-right font-black pr-2'>
        {cantidad}
      </p>
      <p className='md:basis-1/4 text-blue-4f5 text-sm md:text-md md:text-center font-black'>
        {fecharealizo.substring(0, 10)}
      </p>
      <p className='md:basis-1/4 text-blue-4f5 text-sm md:text-md md:text-center font-black capitalize'>
        {estado}
      </p>

      <div className="flex justify-center md:basis-1/4">
      <Link
        to={`pago/${idPago}`}

      >
        <svg
          className="w-6 h-6 lg:w-9 md:h-9 fill-black transition transform hover:scale-125 motion-reduce:transition-none motion-reduce:hover:transform-none hover:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
            <circle
              cx="2"
              cy="12"
              r="2"
            />
            <circle
              cx="12"
              cy="12"
              r="2"
            />
            <circle
              cx="22"
              cy="12"
              r="2"
            />
      </svg>

      </Link>
      </div>
    </div>
  )
}

export default PreviewPago
