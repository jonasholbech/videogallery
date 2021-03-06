import React from "react";

import { StateProvider } from "./modules/store.js";
import MainRouter from "./MainRouter";
import "./styles/variables.css";
import "./App.css";

function App() {
  return (
    <StateProvider>
      <MainRouter />
    </StateProvider>
  );
}

export default App;
