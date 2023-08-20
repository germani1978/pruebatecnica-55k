

export const Header = ({ handleColor, handleCountry, handleReset, handleQuery, query }) => {
  return (
    <div>
        <div className="btns flex gap-4">
        <button onClick={handleColor}>Colorear files</button>
        <button onClick={handleCountry}>Ordenar por pais</button>
        <button onClick={handleReset}>Resetear estado</button>
        <input type="text" placeholder="Buscar" onChange={handleQuery} value={query}/>
      </div>
    </div>
  )
}
