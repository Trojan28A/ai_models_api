import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APIKeyProvider } from "./contexts/APIKeyContext";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Models from "./pages/Models";
import PlaygroundSelector from "./pages/PlaygroundSelector";
import TextPlayground from "./pages/TextPlayground";
import ImagePlayground from "./pages/ImagePlayground";
import AudioPlayground from "./pages/AudioPlayground";
import Docs from "./pages/Docs";

function App() {
  return (
    <APIKeyProvider>
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
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </APIKeyProvider>
  );
}

export default App;
