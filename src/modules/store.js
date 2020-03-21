import React, { createContext, useReducer } from "react";

const initialState = {
  user: {
    loggedIn: false,
    accessToken: null,
    refreshToken: null,
    exp: null
  },
  videos: [],
  playlists: [],
  loaded: {
    videos: false,
    playlists: false
  }
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload };
      case "logout":
        return {
          ...state,
          user: {
            loggedIn: false,
            access_token: null,
            refresh_token: null,
            exp: null
          }
        };
      case "addToVideos":
        return {
          ...state,
          videos: state.videos.concat(action.payload),
          loaded: { playlists: state.loaded.playlists, videos: true }
        }; //TODO: teknisk set ved jeg ikke hvor mange "pages" der er loaded
      case "setPlaylists":
        return {
          ...state,
          playlists: action.payload,
          loaded: { playlists: true, videos: state.loaded.videos }
        };
      case "addPlaylist":
        return { ...state, playlists: state.playlists.concat(action.payload) };
      case "removePlaylist":
        const newPlaylists = state.playlists.filter(item => {
          return item.id !== action.payload;
        });
        return { ...state, playlists: newPlaylists };
      case "updatePlaylistVideos":
        const updatedPlaylists = state.playlists.map(item => {
          if (item.id === action.payload.id) {
            item.videos = action.payload.videos;
          }
          return item;
        });
        console.log(state.playlists, updatedPlaylists);
        return { ...state, playlists: updatedPlaylists };
      default:
        throw new Error("UNHANDLED action.type");
    }

    /*if (action.type === "add") {
      return items.concat({
        id: Math.random(),
        header: action.payload,
        completed: false
      });
    }
    if (action.type === "toggle") {
      return items.map(item => {
        console.log(item);
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    }

    if (action.type === "delete") {
      return items.filter(item => {
        return item.id !== action.payload;
      });
    }*/
    /*  default:
        throw new Error();*/
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
