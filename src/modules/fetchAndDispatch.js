//based on https://scotch.io/tutorials/create-a-custom-usefetch-react-hook
import React, { useEffect, useState, useContext } from "react";
import { store } from "../modules/store.js";

export const useDispatchAuthenticatedGet = (url, type) => {
  const { state, dispatch } = useContext(store);

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
        dispatch({
          type: type,
          payload: json
        });
      } catch (error) {
        throw new Error("HANDLE ME PLEASE");
      }
    };
    FetchData();
  }, []);
};

/*
//usage
const res = useAuthenticatedFetch(`https://dog.ceo/api/breeds/image/random`);

    if (!res.response) {
        return <div>Loading...</div>;
    }
*/
