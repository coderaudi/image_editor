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
import FixedImg from "./components/watermarks/fixedImg"; // last one working 
import UpdatedEditor  from "./components/watermarks/updatedEditor"; 

// working 
import UpdatedEditorWithCropImg from "./components/watermarks/updatedEditorWithCropImg";


import VideoEditor from "./components/videoEditing/videoeditor";
import VideoEditingbyThumbnail from "./components/videoEditing/videoEditingbyThumbnail";
import VideoWatermarking from "./components/videoEditing/videowatermarking";

import UpdatedEditorWithVideo from "./components/watermarks/updatedEditorWithVideo";





function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <UpdatedEditorWithVideo />

        <hr /> <br />
        {/* <VideoEditor /> */}
        </div>
      </header>
    </div>
  );
}

export default App;
