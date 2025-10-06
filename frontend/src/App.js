import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Models from "./pages/Models";
import PlaygroundSelector from "./pages/PlaygroundSelector";
import TextPlayground from "./pages/TextPlayground";
import ImagePlayground from "./pages/ImagePlayground";
import AudioPlayground from "./pages/AudioPlayground";

function App() {
  return (
    <div className="App bg-black min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/playground" element={<PlaygroundSelector />} />
          <Route path="/playground/text" element={<TextPlayground />} />
          <Route path="/playground/image" element={<ImagePlayground />} />
          <Route path="/playground/audio" element={<AudioPlayground />} />
          <Route path="/docs" element={<div className="min-h-screen bg-gray-950 text-white flex items-center justify-center"><h1 className="text-3xl">Documentation Coming Soon</h1></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
