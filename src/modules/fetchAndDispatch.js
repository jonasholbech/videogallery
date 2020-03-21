//based on https://scotch.io/tutorials/create-a-custom-usefetch-react-hook
import React, { useEffect, useContext } from "react";
import { store } from "../modules/store.js";

export const useDispatchAuthenticatedGet = (url, type, all = false) => {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    let page = 1;
    if (state.loaded.videos) {
      return;
    }
    const FetchData = async page => {
      try {
        const res = await fetch(url + "&page=" + page, {
          //TODO: assumes ? already exists in url
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.accessToken}`
          }
        });
        const totalPages = await res.headers.get("x-wp-totalpages");
        const json = await res.json();

        dispatch({
          type: type,
          payload: json
        });
        if (page < totalPages) {
          page++;
          FetchData(page);
        }
      } catch (error) {
        throw new Error("HANDLE ME PLEASE");
      }
    };
    FetchData(page);
  }, []);
};

/*
//usage
const res = useAuthenticatedFetch(`https://dog.ceo/api/breeds/image/random`);

    if (!res.response) {
        return <div>Loading...</div>;
    }
*/
