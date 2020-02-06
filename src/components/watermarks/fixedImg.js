import React, { Component } from 'react';

import "./index.css";
const interact = require('interactjs')



class WatermarkPosition extends Component {


    constructor(props) {
        super(props);

        this.state = {
            textWatermarkList : [
                {
                    fontSize: 20,
                    watermarkID : "watermarkText",
                    opacity: 9,
                    fontFamily: "Courier New",
                    position: "absolute",
                    color: "red",
                    watermarkText : "@ style 2020",
                    textRotatation : 0
                    // transformOrigin: "0 0"
                },
                {
                    fontSize: 20,
                    watermarkID : "watermarkText",
                    opacity: 9,
                    fontFamily: "Courier New",
                    position: "absolute",
                    color: "red",
                    watermarkText : "@ style watermark2",
                    textRotatation : 0
                    // transformOrigin: "0 0"
                }
            ],
            fontSize: 20,
            fontColor: "red",
            rotate: 20,
            textRotatation: 0,
            logoRoatation: 180,
            opacity: 9,
            logoOpacity: 9,
            logoSize: 80,
            watermarkText: "© free style",
            BackgroundImgUrl: "",
            file: "",
            logoFile: "",

            logoOriginalFile : null,
            originalFile : null,

            // image parameters
            actualImgWidth: 1000,
            actualImgHeight: 750
        }

        this.textRotationAngle = 10;

    }

    componentDidMount() {

        let vm = this;

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
                edges: { left: false, right: false, bottom: false, top: false },
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
                },
                move(event) {
                    position.x += event.dx
                    position.y += event.dy
                    console.log(event.target.style.transform);
                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`
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

    // opacityRange 

    textOpacityHandler = (e) => {
        this.setState({
            opacity: e.target.value
        })
    }

    logoOpacityHandler = (e) => {
        this.setState({
            logoOpacity: e.target.value
        })
    }

    FontHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            fontSize: e.target.value
        })

        console.log(this.state);
    }


    handleChange = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            originalFile : event.target.files[0]
        })
    }


    handleLogoFile = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            logoFile: URL.createObjectURL(event.target.files[0]),
            logoOriginalFile : event.target.files[0]
        })
    }


    handleChangeText = (e) => {
        this.setState(
            { watermarkText: e.target.value }
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

    objectMoment = (xyMove) => {


        if (xyMove) {

            let movement = xyMove.split(",");
            let positiveX = !movement[0].includes("-");
            let positiveY = !movement[1].includes("-");
            let xMove = parseInt(movement[0].replace(/\D/g, ""), 10);
            xMove = positiveX ? xMove * 1 : xMove * -1;
            let yMove = parseInt(movement[1].replace(/\D/g, ""), 10);
            yMove = positiveY ? yMove * 1 : yMove * -1;

            return {
                xMove,
                yMove
            }

        }
    }


    checkImg = () => {

        console.log("final State", this.state);

        // original img height and width
        // let originalCoverW = 1000; 
        // let originalCoverH = 750;

        let originalCoverW = this.state.actualImgWidth;
        let originalCoverH = this.state.actualImgHeight;

        // bg img wh  --> preivew img height widht 
        let cover = document.querySelector("#cover");
        let pervieCoverW = cover.clientWidth;
        let pervieCoverH = cover.clientHeight;

        // logo w h  ==> logo height and width on preview img 
        let wmLogoImg = document.querySelector("#watermarkLogo");
        let wmLogoImgcurrWidth = wmLogoImg.clientWidth;
        let wmLogoImgcurrHeight = wmLogoImg.clientHeight - 4;

        console.log("details- ");
        console.log("original w-h- ", originalCoverW, originalCoverH);
        console.log("preview w-h- ", pervieCoverW, pervieCoverH);
        console.log("logo preivew w-h- ", wmLogoImgcurrWidth, wmLogoImgcurrHeight);

        // for watermark text 
        let waterMarkText = document.getElementById('watermarkText');
        console.log(waterMarkText.style.transform);

        let watermarkLogo = document.getElementById('watermarkLogo');

        let xyMovesLogo = this.objectMoment(watermarkLogo.style.transform);
        let xyMovesText = this.objectMoment(waterMarkText.style.transform);

        console.log("logo", xyMovesLogo, "txt", xyMovesText);

        // distance  x y 
        let aspRatiobyW = originalCoverW / pervieCoverW;  // by width 
        let aspRatiobyH = originalCoverH / pervieCoverH; // by h

        // xy on original img 
        let finalX = aspRatiobyW * xyMovesLogo.xMove;
        let finalY = aspRatiobyH * xyMovesLogo.yMove;

        let fW = wmLogoImgcurrWidth * aspRatiobyW;
        let fH = wmLogoImgcurrHeight * aspRatiobyH;

        let finalTextX = aspRatiobyW * xyMovesText.xMove;
        let finalTextY = aspRatiobyH * xyMovesText.yMove + (0.018 * pervieCoverH); // 0.018 y move per 1px 


        let textFper = (this.state.fontSize / pervieCoverW) * 100;
        let finalTextF = (textFper * originalCoverW) / 100;


        let url = `ffmpeg -i gridOrg.jpg -i box.jpg -filter_complex "[1]scale=${fW}:${fH}[a];[a]lut=a=val*0.9[b];[0][b] overlay=${finalX}:${finalY}" -y watermarkLogo.jpg`
        let txtUrl = `ffmpeg -i gridOrg1.jpg -filter_complex "[0]drawtext=fontfile=cour.ttf:text='${this.state.watermarkText}':fontcolor=${this.state.fontColor}:fontsize=${finalTextF}:x=${finalTextX}:y=${finalTextY}" -y restextWatermark.jpg`

        // console.log(txtUrl);

       let logoRotation = `ffmpeg -i gridOrg.jpg -i logoA.png -filter_complex "[1]scale=${fW}:${fH}[a];[a]rotate='${this.state.logoRoatation}*PI/180:ow=hypot(iw,ih):oh=ow:c=none'[a];[0][a]overlay=${finalX}:${finalY}" -y testRotation.jpg`

        let urlTextLogo = `ffmpeg -i gridOrg.jpg -i ${this.state.logoOriginalFile.name} -filter_complex "[1]scale=${fW}:${fH}[t],[t]lut=a=val*0.${this.state.logoOpacity}[t],[t]rotate=${this.state.logoRoatation}*PI/180[t],[0][t]overlay=${finalX}:${finalY}[i1];[i1]drawtext=fontfile='cour.ttf': text='${this.state.watermarkText}':fontcolor=${this.state.fontColor}@0.${this.state.opacity}:fontsize=${finalTextF}:x=${finalTextX}:y=${finalTextY}" -y res_logoText.jpg`;

        console.log(urlTextLogo);   
   

        

    }


    addTextWatermark = () =>{

        let userTextWatermarkList = [
            {
                watermarkID : "watermarkText",
                fontSize: this.state.fontSize,
                opacity: `0.${this.state.opacity}`,
                fontFamily: "Courier New",
                position: "absolute",
                color: this.state.fontColor,
                watermarkText : "@ style",
                textRotatation : 45
                // transformOrigin: "0 0"
            }
        ]

        userTextWatermarkList = this.state.textWatermarkList;
     
        let textOne = userTextWatermarkList[0];

        let textOneStyle = `font-size: ${textOne.fontSize}px; opacity:0.${textOne.opacity}; font-family: ${textOne.fontFamily}; position: absolute; color:${textOne.color}`;
        let newTextWatermark = document.createElement('div'); // is a node

             newTextWatermark.setAttribute("class", "draggable-text");
             newTextWatermark.setAttribute("style", textOneStyle);
             newTextWatermark.setAttribute("id", `${textOne.watermarkID}`);

             let subTextdiv = document.createElement('div');
                 subTextdiv.setAttribute("style", `transform : rotate(${textOne.textRotatation}deg)`);
                 subTextdiv.innerHTML = `${textOne.watermarkText}`;
                 newTextWatermark.appendChild(subTextdiv);

                // add to dom 

                console.log(newTextWatermark);
                document.getElementById("cover").appendChild(newTextWatermark);

                textOne = userTextWatermarkList[1];

                 textOneStyle = `font-size: ${textOne.fontSize}px; opacity:0.${textOne.opacity}; font-family: ${textOne.fontFamily}; position: absolute; color:${textOne.color}`;
                 newTextWatermark = document.createElement('div'); // is a node
        
                     newTextWatermark.setAttribute("class", "draggable-text");
                     newTextWatermark.setAttribute("style", textOneStyle);
                     newTextWatermark.setAttribute("id", `${textOne.watermarkID}`);
        
                 subTextdiv = document.createElement('div');
                         subTextdiv.setAttribute("style", `transform : rotate(${textOne.textRotatation}deg)`);
                         subTextdiv.innerHTML = `${textOne.watermarkText}`;
                         newTextWatermark.appendChild(subTextdiv);
        
                        // add to dom 
        
                        console.log(newTextWatermark);
                        document.getElementById("cover").appendChild(newTextWatermark);

    }

    render() {


        let logoStyle = {
            width: this.state.logoSize,
            opacity: `0.${this.state.logoOpacity}`,
            transform: `rotate(${this.state.logoRoatation}deg)`
        }

        let editorConsole = {
            position: "relative",
            backgroundImage: `url(${this.state.file})`,
            width: "500px",
            height: "375px",
        }

     

        return (
            <div>

                <div>
                    <h4>User inputs </h4>
                    text Opacity : <input type="range" name="points" min="0" max="9"
                        onChange={e => this.textOpacityHandler(e)} />
                    {/* Font :  <input type="range" name="font" min={10} max={100} 
                            onChange={e => this.FontHandler(e)} /> */}
                    Logo Opacity : <input type="range" name="logoOpacity" min="0" max="9"
                        onChange={e => this.logoOpacityHandler(e)} />
                  
                    Logo Rotation : <input type="range" name="logoRotation" min="0" max="360"
                        onChange={(e) => this.setState({ logoRoatation: parseInt(e.target.value, 10) })} />
                    Text Rotation : <input type="range" name="logoRotation" min="0" max="360"
                        onChange={(e) => this.setState({ textRotatation: parseInt(e.target.value, 10) })} />
                        <br />
                    cover: <input type="file" onChange={this.handleChange} />
                    logo : <input type="file" onChange={this.handleLogoFile} />
                    text : <input type="text" value={this.state.watermarkText} onChange={e => this.handleChangeText(e)} />
                    {/* logoRotate <input type="number" onChange={ (e) => this.setState({ textRotatation : parseInt(e.target.value, 10)})} />  */}

                </div>

                <span>
                    <button onClick={() => this.addFont()}>Font++</button>
                    <button onClick={() => this.removeFont()}>Font --</button>
                    <button onClick={() => this.increaseLogo()}> logo ++</button>
                    <button onClick={() => this.reduceLogo()}> logo -- </button>
                    {/* <button onClick={() => this.saveImg()}> Save Img</button> */}
                    <button onClick={() => this.checkImg()}> check Img</button>

                    <button onClick={ () => this.addTextWatermark()} > Add Text</button>

                </span>
                <hr />

                <div className="watermark-playground">

                    <div className="editor-console"
                        id="cover"
                        style={editorConsole}
                    >

                        <div className="draggable-logo"
                            id="watermarkLogo"
                            style={{ position: "absolute" }} >
                            <img src={this.state.logoFile}
                                id="watermarkLogoImg"
                                style={logoStyle}

                                className="resizable-logo"
                            />
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