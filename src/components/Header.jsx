import { ORDER } from "../const/const";


export const Header = ({ handleColor, handleCountry, handleReset, handleQuery, query , order }) => {
  return (
    <div>
        <div className="header btns grid gap-4 grid-cols-4">
        <button onClick={handleColor}>Colorear files</button>
        <button onClick={handleCountry}>{ order !== ORDER.BY_COUNTRY ? "Ordenar por pais":"No ordenar por pais" } </button>
        <button onClick={handleReset}>Resetear estado</button>
        <input type="text" placeholder="Buscar" onChange={handleQuery} value={query}/>
      </div>
    </div>
  )
}
