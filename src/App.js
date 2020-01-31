import React from 'react';
// import logo from './logo.svg';
import './App.css';
import FacebookLive from "./components/facebookLive";

import Watermark from "./components/watermarks/watermark";

import InteractJS from "./components/watermarks/interactjs";

import ResizeDrag from "./components/watermarks/resize-drag";

import EditImg from "./components/watermarks/editImg";

import TstEditor from "./components/watermarks/toast";

import WatermarkPosition from "./components/watermarks/watermarkPositions";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <WatermarkPosition />
        </div>
      </header>
    </div>
  );
}

export default App;
