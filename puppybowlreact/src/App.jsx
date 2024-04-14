import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Homepage";
import Allplayers from "./Components/Allplayers";
import Singleplayer from "./Components/Singleplayer";
import Newplayerform from "./Components/Newplayerform";

function App() {
  return (
      <>
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Allplayers />} />
          <Route path="/players/new" element={<Newplayerform />} />
          <Route path="/players/:id" element={<Singleplayer />} />
        </Routes>
        </BrowserRouter>
      </>
  );
};

export default App;