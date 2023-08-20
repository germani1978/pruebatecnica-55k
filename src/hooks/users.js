import { useEffect, useRef, useState } from "react";
import { getData } from "../services/fetch";

export const useUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const originalUsers = useRef([]);
  
    //carga los datos al motar el componente
    useEffect(() => {
  
      async function init() {
        setLoading(true);
        const dataUsers = await getData();
    
        //si devuelve null es que tuvo un error
        if (dataUsers === null) return setError(true);
    
        setUsers(dataUsers ?? []);
        originalUsers.current = dataUsers ?? [];
    
        setLoading(false);
      }
  
      init();
    }, []);
  
  
    function reinitUsers() {
      setUsers(originalUsers.current)
    }
  
    function deleteUser(id) {
      setUsers(users.filter((user) => user.login.uuid !== id));
    }
  
    return {users, error, loading, reinitUsers ,deleteUser }
  }
  