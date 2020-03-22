//based on https://scotch.io/tutorials/create-a-custom-usefetch-react-hook
import React, { useEffect, useState } from "react";

export const useAuthenticatedFetch = url => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
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
