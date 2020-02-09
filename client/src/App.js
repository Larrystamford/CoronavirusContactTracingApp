import React from "react";
import "./App.css";
import { HomePage } from "./pages/HomePage";

import { NavBar } from "./components/NavBar";
import { NoPageFound } from "./pages/NoPageFound";
import "react-tree-graph/dist/style.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <HomePage />
    </div>
  );
}

export default App;
