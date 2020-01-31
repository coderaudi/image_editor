import React, { Component } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';

import demoImg from "../../assets/ntr5.jpg";
import waterMark from "../../assets/logo1.jpg";


const myTheme = {
    // Theme object to extends default dark theme.
  };

class ImgEditro extends Component {

    editorRef = React.createRef();
  
    handleClickButton = () => {
      const editorInstance = this.editorRef.current.getInstance();
   
      editorInstance.flipX();
      console.log(editorInstance);
    };
    
    handleMousedown = (e) => {
        console.log('Mouse button is downed!');
        console.log(e);

      };


    render() {
        return (
            <div>

<ImageEditor
    ref={this.editorRef}
    onMousedown={this.handleMousedown}
      includeUI={{
        loadImage: {
          path: '',
          name: 'SampleImage'
        },
        theme: {},
        menu: ['shape', 'rotate', 'filter' , 'crop','text', "icon"],
        initMenu: 'filter',
        uiSize: {
          width: '1000px',
          height: '700px'
        },
        menuBarPosition: 'bottom'
      }}
      cssMaxHeight={500}
      cssMaxWidth={700}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70
      }}
      usageStatistics={true}
    />

<button onClick={this.handleClickButton}>Flip image by X Axis!</button>


            </div>
        );
    }
}

export default ImgEditro;