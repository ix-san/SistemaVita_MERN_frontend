const Vita = () => {
  return(
    <>
      <div className='p-10'>
      <img className=" absolute object-contain hover:object-scale-down w-4/5 h-4/5 opacity-5" src="../src/img/vita-nombre.png" alt=""/>
          <div className='grid grid-cols-3 gap-1 text-black font-black text-5xl text-center pt-5'>
              <h1 className='col-start-2 border-b-4 r border-blue-485'>Meta</h1>
          </div>
          <p className='text-black text-3xl text-center pt-5 pb-20'>Ayudar a los recidentes a mantenerse activos e involucrados.</p>

          <div className='grid grid-cols-3 gap-1 text-black font-black text-5xl text-center pt-8'>
              <h1 className='col-start-2 border-b-4 r border-blue-485'>Misión</h1>
          </div>
          <p className='text-black text-3xl text-center pt-4'>
            Enriqueser la experiencia del envejecimiento proporcionando oportunidades para una vida saludable y con un propósito,
            dándoles un lugar y deseos de vivir con dignidad y felicidad.
          </p>
      </div>
      </>
  )
}

export default Vita
