import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { ORDER } from "./const/const";
import { useUsers } from "./hooks/users";
import { useFilter } from "./hooks/filters";

function App() {

  const [putColorBar, setPutColorBar] = useState(false);
  const { loading, error, users, reinitUsers, deleteUser } = useUsers(); //users
  const { order, listOrdered, togleOrder, query , cleanQuery, updateQuery } = useFilter(users); //filters

  const handleBarColor = () => setPutColorBar(!putColorBar);
  const handleName = () => togleOrder(ORDER.BY_FIRST_NAME);
  const handleApellido = () => togleOrder(ORDER.BY_LAST_NAME);
  const handleCountry = () => togleOrder(ORDER.BY_COUNTRY)
  const handleQuery = (e) => updateQuery(e.target.value);
  const handleDelete = (id) => deleteUser(id);

  const handleReset = () => {
    setPutColorBar(false);
    togleOrder(null)
    cleanQuery();
    reinitUsers();
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
        order={order}
      />

      { error && <h1>Error al cargar</h1>}
      {!error && loading && <h1>Cargando</h1>}
      {!error && !loading && users.length === 0 && <h1>No hay usuarios</h1>}
      {!error && !loading && users.length !== 0 && (
        <Table
          putColorBar={putColorBar}
          handleName={handleName}
          handleApellido={handleApellido}
          handleCountry={handleCountry}
          handelDelete={handleDelete}
          listUsers={listOrdered()}
        />
      )}
    </main>
  );
}

export default App;
