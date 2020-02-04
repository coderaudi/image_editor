import React, { Component } from 'react';
import demoImg from "../../assets/ntr5.jpg";
// import waterMark from "../../assets/resize_logo.png";

import waterMark from "../../assets/box.jpg";

import "./index.css";
const interact = require('interactjs')



class WatermarkPosition extends Component {


    constructor(props) {
        super(props);

        this.state = {
            fontSize: 20,
            rotate: 20,
            opacity: 9,
            logoOpacity: 9,
            logoSize: 80,
            watermarkText: "© dymmyImg",
            BackgroundImgUrl: "",
            file: ""
        }
    }

    componentDidMount() {


        // drag the element on page 
        const position = { x: 0, y: 0 }
        interact('.draggable-logo').draggable({
            listeners: {
                start(event) {
                    // console.log(event.type, event.target)
                },
                move(event) {
                    position.x += event.dx
                    position.y += event.dy

                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`

                    console.log(event.type, event.target)
                },

            }
        })

        // resize the element 
        interact(".resizable-logo")
            .resizable({
                edges: { left: false, right: true, bottom: true, top: false },
                // modifiers: [
                //   interact.modifiers.restrictEdges({
                //     outer: "parent",
                //     endOnly: true
                //   })
                // ],
                inertia: true,
                modifiers: [
                    // keep the edges inside the parent
                    // interact.modifiers.restrictEdges({
                    //   outer: 'parent'
                    // }),

                    // minimum size
                    interact.modifiers.restrictSize({
                        min: { width: 20, height: 20 }
                    })
                ],
            })
            .on("resizemove", function (event) {
                var target = event.target
                console.log(target);
                target.style.width = event.rect.width + "px"
                target.style.height = event.rect.height + "px"
            })


        // text drag(move)
        interact('.draggable-text').draggable({
            listeners: {
                start(event) {
                    // console.log(event.type, event.target)
                },
                move(event) {
                    position.x += event.dx
                    position.y += event.dy
                    console.log(event)
                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`

                    // console.log(event.type, event.target)
                },

            }
        })

        // resize the element 
        // interact(".resizable-text")
        // .resizable({
        //         edges: { left: false, right: true, bottom: true, top: false },
        //         // modifiers: [
        //         //   interact.modifiers.restrictEdges({
        //         //     outer: "parent",
        //         //     endOnly: true
        //         //   })
        //         // ],
        //         inertia: true
        //     })
        //     .on("resizemove", function(event) {
        //         var target = event.target
        //         console.log(event);
        //         target.style.width = event.rect.width + "px"
        //         target.style.height = event.rect.height + "px"
        //     })


    }


    handleChange = (event) => {

        console.log(event.target.files[0]);

        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }


    handleChangeText = (e) => {
        this.setState(
            { watermarkText : e.target.value}
        )
    }

    addFont = () => {

        this.setState({
            fontSize: this.state.fontSize + 1
        })
    }

    removeFont = () => {

        this.setState({
            fontSize: this.state.fontSize - 1
        })
    }

    reduceOpacity = () => {

        this.setState({
            opacity: this.state.opacity - 1
        })
    }

    increaseOpacity = () => {

        this.setState({
            opacity: this.state.opacity + 1
        })
    }

    reduceLogoOpacity = () => {

        this.setState({
            logoOpacity: this.state.logoOpacity - 1
        })
    }

    increaseLogoOpacity = () => {

        this.setState({
            logoOpacity: this.state.logoOpacity + 1
        })
    }


    increaseLogo = () => {

        this.setState({
            logoSize: this.state.logoSize + 5
        })
    }

    reduceLogo = () => {

        this.setState({
            logoSize: this.state.logoSize - 5
        })
    }


    saveImg = () => {

        // let waterMarkText = document.getElementById('watermarkText');
        // console.log(waterMarkText.style.transform);

        let watermarkLogo = document.getElementById('watermarkLogo');

        console.log(`logo movement : ${watermarkLogo.style.transform}`);  // er -40

        // let movement = watermarkLogo.style.transform.split(",");

        // let positiveX = !movement[0].includes("-");
        // let positiveY = !movement[1].includes("-");
        // let xMove = parseInt(movement[0].replace(/\D/g, ""), 10);
        // xMove = positiveX ? xMove * 1 : xMove * -1;
        // let yMove = parseInt(movement[1].replace(/\D/g, ""), 10);
        // yMove = positiveY ? yMove * 1 : yMove * -1;
        // yMove = yMove + 23;
        // console.log(`logo movement : xMove = ${xMove}, yMove=${yMove}`);  // er -40

        let watermarkLogoImg = document.getElementById('watermarkLogoImg');
        let logoH = parseFloat(watermarkLogoImg.style.height);
        let logoW = parseFloat(watermarkLogoImg.style.width);

        console.log(watermarkLogoImg);

         console.log(` Logo width  : ${logoW} - Logo height : ${logoH} - logo opacity : ${this.state.logoOpacity}`);  // er -40


        // let originalImgWidth = 1000;
        // let originalImgHight = 667;

        // let userImg = originalImgWidth > originalImgHight ? "W" : "H";
        // let aspectRation = userImg == "W" ? originalImgWidth / 1000 : originalImgHight / 600;


        // let nLogoWidth = originalImgWidth * logoW / 800;
        // let nLogoHeight = originalImgHight * logoH / 533.6;

        // let nLogoOriginX = xMove * originalImgWidth / 800;
        // let nLogoOriginY = yMove * originalImgHight / 533.6;


        // console.log(aspectRation);
        // console.log(userImg);

        // console.log(`final logo movement : xMove = ${xMove * aspectRation}, yMove=${yMove * aspectRation}`);
        // console.log(`final Logo width : ${logoW * aspectRation} - final Logo height : ${logoH * aspectRation} - logo opacity : ${this.state.logoOpacity}`);

        // let url = `ffmpeg -i ntr5.jpg -i logo3.jpg -filter_complex "[1]scale=${nLogoWidth}:${nLogoHeight}[a];[a]lut=a=val*0.9[b];[0][b] overlay=${nLogoOriginX}:${nLogoOriginY}" -y watermarkLogo.jpg`
        // // scale => width and h of logo 
        // // overlay => x y start position 
        // console.log(url);
    }


    checkImg = () => {

        // original img height and width
        let originalCoverW = 2000; 
        let originalCoverH = 1499;

        // bg img wh  --> preivew img height widht 
        let cover = document.querySelector("#cover");
        let pervieCoverW = cover.clientWidth;
        let pervieCoverH = cover.clientHeight;

        // logo w h  ==> logo height and width on preview img 
        let wmLogoImg = document.querySelector("#watermarkLogo");
        let wmLogoImgcurrWidth = wmLogoImg.clientWidth;
        let wmLogoImgcurrHeight = wmLogoImg.clientHeight - 4;

        console.log("details- " );
        console.log("original w-h- " ,originalCoverW , originalCoverH );
        console.log("preview w-h- " ,pervieCoverW , pervieCoverH );
        console.log("logo preivew w-h- " ,wmLogoImgcurrWidth , wmLogoImgcurrHeight );


        let watermarkLogo = document.getElementById('watermarkLogo');
        let movement = watermarkLogo.style.transform.split(",");
        let positiveX = !movement[0].includes("-");
        let positiveY = !movement[1].includes("-");
        let xMove = parseInt(movement[0].replace(/\D/g, ""), 10);
              xMove = positiveX ? xMove * 1 : xMove * -1;
        let yMove = parseInt(movement[1].replace(/\D/g, ""), 10);
                yMove = positiveY ? yMove * 1 : yMove * -1;
                
        console.log(`logo movement : xMove = ${xMove}, yMove=${yMove}`);  // er -40
        console.log(`logo movement : ${watermarkLogo.style.transform}`);  // er -40

        // distance  x y 
        let aspRatiobyW = originalCoverW /pervieCoverW ;  // by width 
        let aspRatiobyH = originalCoverH/pervieCoverH ; // by h

        // xy on original img 
          let finalX = aspRatiobyW *  xMove;  
          let finalY = aspRatiobyH *  yMove ;

         let fW = wmLogoImgcurrWidth * aspRatiobyW;
         let fH = wmLogoImgcurrHeight * aspRatiobyH;


        let url = `ffmpeg -i gridOrg.jpg -i box.jpg -filter_complex "[1]scale=${fW}:${fH}[a];[a]lut=a=val*0.9[b];[0][b] overlay=${finalX}:${finalY}" -y watermarkLogo.jpg`
  
        console.log(url);

        // alert("Current width=" + currWidth + ", " + "Original height=" + currHeight );
        //  alert( "Current Lwidth=" + wmLogoImgcurrWidth + ", " + "Original L height=" + currHeight);
    }

    getLogos = () => {

        let textStyle = {
            background: "red",
            fontSize: this.state.fontSize,
            opacity: `0.${this.state.opacity}`,
            fontFamily: "Courier New"
        }


        let logoStyle = {
            width: this.state.logoSize,
            opacity: `0.${this.state.logoOpacity}`,
        }


        return <div>
            {/* 
                       <div className="draggable-text" id="watermarkText" style={textStyle} >
                            {this.state.watermarkText}
                        </div> */}





        </div>
    }


    render() {


        let logoStyle = {
            width: this.state.logoSize,
            opacity: `0.${this.state.logoOpacity}`,
        }

        let editorConsole = {

            backgroundImage: `url(${this.state.file})`,
            width: "1000px",
            height: "750px"
        }

        let textStyle = {
            // background: "red",
            fontSize: this.state.fontSize,
            opacity: `0.${this.state.opacity}`,
            fontFamily: "Courier New"
        }

        return (
            <div>

                <div>
                    <h4>User inputs </h4>
                    <input type="file" onChange={this.handleChange} />
                    <input type="text" onChange={ e => this.handleChangeText(e)} />

                    {/* 
                     <img src={this.state.file}/> */}
                </div>

                <span>
                    <button onClick={() => this.addFont()}>Font+</button>
                    <button onClick={() => this.removeFont()}>Font -</button>
                    <button onClick={() => this.reduceOpacity()}>Opacity -- </button>
                    <button onClick={() => this.increaseOpacity()}>Opacity ++</button>
                    <button onClick={() => this.increaseLogo()}>WaterMark logo ++</button>
                    <button onClick={() => this.reduceLogo()}>WaterMark logo -- </button>
                    <button onClick={() => this.saveImg()}> Save Img</button>
                    <button onClick={() => this.checkImg()}> check Img</button>
                    <button onClick={() => this.reduceLogoOpacity()}> logo Opacity -- </button>
                    <button onClick={() => this.increaseLogoOpacity()}> logo Opacity ++</button>

                </span>
                <hr />


                <div className="watermark-playground">

                    <div className="editor-console"
                        id="cover"
                        style={editorConsole}
                    >

                        <div className="draggable-logo" 
                          id="watermarkLogo" >
                            <img src={waterMark}
                                id="watermarkLogoImg"
                                style={logoStyle}

                                className="resizable-logo"
                            />
                        </div>


                        <div className="draggable-text" id="watermarkText" style={textStyle} >
                            {this.state.watermarkText}
                        </div>




                    </div>

                </div>



<br />
<br />
<br />
<br />
<br />

            </div>
        );
    }
}

export default WatermarkPosition;