export const Table = ({ putColorBar , handleName, handleApellido,handleCountry , handelDelete, listUsers}) => {

  return (
    <table>
      <thead>
        <tr>
          <td>Foto</td>
          <td onClick={handleName}><button>Name</button></td>
          <td onClick={handleApellido}><button>Apellido</button></td>
          <td onClick={handleCountry}><button>Pais</button></td>
          <td>Acciones</td>
        </tr>
      </thead>

      <tbody>
        {listUsers.map((user, index) => (
          <tr
            key={user.login.uuid}
            className={` ${
              putColorBar ? (index % 2 === 0 ? "bg-slate-200" : "bg-slate-400") : ""
            }`}
          >
            <td>
              <img src={user.picture.thumbnail} alt="foto" />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => handelDelete(user.login.uuid)}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
