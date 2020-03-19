//based on https://scotch.io/tutorials/create-a-custom-usefetch-react-hook
import React, { useEffect, useState, useContext } from "react";
import { store } from "../modules/store.js";

export const useAuthenticatedFetch = url => {
  const { state, dispatch } = useContext(store);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.accessToken}`
          }
        });
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    FetchData();
  }, []);
  return { response, error };
};
/*
//usage
const res = useAuthenticatedFetch(`https://dog.ceo/api/breeds/image/random`);

    if (!res.response) {
        return <div>Loading...</div>;
    }
*/
