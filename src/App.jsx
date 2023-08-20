import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { getData } from "./services/fetch";
import { Header } from "./components/Header";
import { Table } from "./components/Table";

const ORDER = {
  BY_FIRST_NAME: "first",
  BY_LAST_NAME: "last",
  BY_COUNTRY: "country",
};

function App() {
  const [users, setUsers] = useState([]);
  const [putColorBar, setPutColorBar] = useState(false);
  const [order, setOrder] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //guarda estado original
  const originalUsers = useRef([]);

  //carga los datos al motar el componente
  async function init() {
    setLoading(true);
    const dataUsers = await getData();

    //si devuelve null es que tuvo un error
    if (dataUsers === null) return setError(true);

    setUsers(dataUsers ?? []);
    originalUsers.current = dataUsers ?? [];

    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  
  const sortedByField = useCallback(
    (field, listUsers) => {
      if (field === ORDER.BY_FIRST_NAME)
        return [...listUsers].sort((user1, user2) =>
          user1.name.first.localeCompare(user2.name.first)
        );
      if (field === ORDER.BY_LAST_NAME)
        return [...listUsers].sort((user1, user2) =>
          user1.name.last.localeCompare(user2.name.last)
        );
      if (field === ORDER.BY_COUNTRY)
        return [...listUsers].sort((user1, user2) =>
          user1.location.country.localeCompare(user2.location.country)
        );
    },
    []
  );

  const listOrder = useCallback(() => {
    //filtra por query
    const listUsers = (query === "") ? [...users] : [...users].filter( user => user.location.country.toLowerCase().includes( query.toLowerCase() )) ;

    //ordena por nombre, apellido y pais
    if (order) return sortedByField(order, listUsers);
    else return listUsers;

  },[ query, order,sortedByField, users])



  //manejadores de estado
  const handleBarColor = () => setPutColorBar(!putColorBar);

  const handleName = () => {
    if (order) return setOrder(null);
    setOrder(ORDER.BY_FIRST_NAME);
  }

  const handleApellido = () => {
    if (order) return setOrder(null);
    setOrder(ORDER.BY_LAST_NAME);
  }
  const handleCountry = () => {
    if (order) return setOrder(null);
    setOrder(ORDER.BY_COUNTRY)
  };
  
  const handleQuery = (e) => setQuery(e.target.value);

  const handelDelete = (id) =>
    setUsers(users.filter((user) => user.login.uuid !== id));

  const handleReset = () => {
    setPutColorBar(false);
    setOrder(null)
    setQuery("");
    setUsers(originalUsers.current);
  };

  return (
    <main className="fondo flex flex-col items-center gap-8 w-full p-16">
      <h1 className="text-5xl font-bold">Lista de usuarios</h1>

      <Header
        handleColor={handleBarColor}
        handleCountry={handleCountry}
        handleReset={handleReset}
        handleQuery={handleQuery}
        query={query}
      />

      {error && <h1>Error al cargar</h1>}
      {!error && loading && <h1>Cargando</h1>}
      {!error && !loading && users.length === 0 && <h1>No hay usuarios</h1>}
      {!error && !loading && users.length !== 0 && (
        <Table
          putColorBar={putColorBar}
          handleName={handleName}
          handleApellido={handleApellido}
          handleCountry={handleCountry}
          handelDelete={handelDelete}
          listUsers={listOrder()}
        />
      )}
    </main>
  );
}

export default App;
