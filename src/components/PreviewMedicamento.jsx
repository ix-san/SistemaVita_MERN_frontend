const PreviewMedicamento = ({medicamento}) => {
  const {desayuno, comida, cena, notas, datemodificacion} = medicamento

  return (
    <div className='grid grid-rows-3 grid-flow-col gap-2'>
        <div className='w-6/7'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="padecimiento"
            >Desayuno</label>
            <textarea
                id="padecimiento"
                placeholder="Desayuno del residente"
                className="capitalize w-full mt-1 p-2.5 border rounded-xl bg-gray-100"
                value={desayuno === null ? '' : desayuno}
                disabled={true}
            />
        </div>
        <div className='w-6/7'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="padecimiento"
            >Comida</label>
            <textarea
                id="padecimiento"
                placeholder="Comida del residente"
                className="capitalize w-full mt-1 p-2.5 border rounded-xl bg-gray-100"
                value={comida === null ? '' : comida}
                disabled={true}
            />
        </div>
        <div className='w-6/7'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="padecimiento"
            >Cena</label>
            <textarea
                id="padecimiento"
                placeholder="Cena del residente"
                className="capitalize w-full mt-1 p-2.5 border rounded-xl bg-gray-100"
                value={cena === null ? '' : cena}
                disabled={true}
            />
        </div>
        <div className='w-6/7 row-span-2 col-span-2 pl-2'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="padecimiento"
            >Notas</label>
            <textarea
                id="padecimiento"
                placeholder="Notas del residente"
                className="capitalize w-full h-2/3 mt-1 p-1 border rounded-xl bg-gray-100"
                value={notas === null ? '' : notas}
                disabled={true}
            />
        </div>

        <div className='pt-2'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="fecha-modi"
            >Fecha Edicion</label>
            <input
                id="fecha-modi"
                type="date"
                className="w-full mt-1 p-1 border rounded-xl bg-gray-100"
                value={datemodificacion?.split('T')[0]}
                disabled={true}
            />
        </div>
    </div>
  )
}

export default PreviewMedicamento
