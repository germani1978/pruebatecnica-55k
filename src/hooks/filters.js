import { useCallback, useState } from "react";
import { ORDER } from "../const/const";

export const useFilter = (users) => {

    const [query, setQuery] = useState("");
    const [order, setOrder] = useState(null);
  
    function cleanQuery() {
      setQuery("");
    }
  
    function updateQuery(text) {
      setQuery(text);
    }
  
  
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
  
    const listOrdered = useCallback(() => {
      //filtra por query
      const listUsers = (query === "") ? [...users] : [...users].filter( user => user.location.country.toLowerCase().includes( query.toLowerCase() )) ;
  
      //ordena por nombre, apellido y pais
      if (order) return sortedByField(order, listUsers);
      else return listUsers;
  
    },[ query, order,sortedByField, users])
  
    function togleOrder( value ) {
      if (order === value) return setOrder(null);
      setOrder(value);
    }
  
    return { order, listOrdered, togleOrder, query , cleanQuery, updateQuery }
  
  }