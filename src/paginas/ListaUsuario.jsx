import useUsuarios from "../hooks/useUsuarios"
import PreviewUsuario from "../components/PreviewUsuario"

const ListaUsuario = () => {
  const {usuarios} = useUsuarios()
  return(
    <>
        <h1 className="flex flex-row pt-4 pl-10 text-4xl text-blue-006 font-black capitalize">Listar usuario
          <svg
            className="flex w-10 h-10 pl-2 fill-blue-006"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
            />
          </svg>
        </h1>

        <div className="bg-blue-4f5 border-b p-1 grid grid-cols-7 shadow mt-5 rounded-lg mx-10">
          <p className="col-start-1 col-end-3 text-sky-cdc text-sm font-black capitalize">usuario</p>
          <p className="col-start-3 col-end-6 text-sky-cdc text-sm font-black capitalize">nombre</p>
        </div>
        <div className="overflow-y-auto h-48 md:h-3/5 bg-blue-898 shadow rounded-lg mx-10">
            {usuarios.length ?
              usuarios.map(usuario => (
                <PreviewUsuario
                    key={usuario.idUser}
                    usuario={usuario}
                />
              ))
            : <p className="text-center text-blue-354 uppercase p-3">No hay usuarios</p>}
        </div>
        <div className="mt-5">.</div>
    </>
  )
}

export default ListaUsuario
