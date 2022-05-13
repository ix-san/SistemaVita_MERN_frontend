import {Link} from 'react-router-dom'
const PreviewUsuario = ({usuario}) => {
  const {userFullName, idUser, username} = usuario

  return (
    <div className="border-b p-1 grid grid-cols-7 gap-2">
      <p className="col-start-1 col-end-3 text-blue-4f5 text-md font-black">
        {username}
      </p>
      <p className="col-start-3 col-end-6 text-blue-4f5 text-md font-black capitalize">
        {userFullName}
      </p>

      <div className="flex justify-center col-start-7">
      <Link
        to={`${idUser}`}

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

export default PreviewUsuario
