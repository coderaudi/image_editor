import React, { Component } from 'react';

import "./index.css";
const interact = require('interactjs')



class WatermarkPosition extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentEementId : null,
            textWatermarkList : [
                {
                    fontSize: 20,
                    watermarkID : "watermarkText_0",
                    opacity: 9,
                    fontFamily: "Courier New",
                    position: "absolute",  // keep same for all
                    color: "red",
                    watermarkText : "@ style 2020",
                    textRotatation : 0
                    // transformOrigin: "0 0"
                },
                {
                    fontSize: 20,
                    watermarkID : "watermarkText_1",
                    opacity: 9,
                    fontFamily: "Courier New",
                    position: "absolute",
                    color: "green",
                    watermarkText : "@ style watermark2",
                    textRotatation : 0
                    // transformOrigin: "0 0"
                }
            ],
            fontSize: 20,
            fontColor: "red",
            rotate: 20,
            textRotatation: 45,
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
        this.textWatermarkCount = 0;

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


    domChangeHandler = (changeParameter , value) => {

        // update the element 

        let modifingElement = this.state.currentEementId;
        console.log("changing element " , modifingElement)
        let ele =  document.getElementById(modifingElement);
        console.log(document.getElementById(modifingElement).childNodes[0].innerText);
   
         let lastFont = parseInt(ele.style.fontSize, 10);
         if( changeParameter === "fontAdd"){
            ele.style.fontSize =  `${lastFont  ? lastFont + 4 : 20}px`; 
         }

         if( changeParameter === "fontRemove"){
            ele.style.fontSize =  `${lastFont  ? lastFont - 4 : 20}px`; 
         }

         if(changeParameter === "color"){
            ele.style.color = value ? value : "black"; 
         }
         if(changeParameter === "opacity"){
            ele.style.opacity = value ? `0.${value}` : "0.9"; 
         }


         if( changeParameter === "fontRange"){
             console.log(value);
         }

         
         if(changeParameter === "watermarkText" ){
            if(value){
                document.getElementById(modifingElement).childNodes[0].innerText = value
            }else{
                document.getElementById(modifingElement).childNodes[0].innerText = "Click To Edit"
            }
         }
    }



    finalTextXY = ( aspRatiobyW , aspRatiobyH , txtObj , basicData) =>{

        let waterMarkText = document.getElementById(txtObj.watermarkID);
        let xyMovesText = this.objectMoment(waterMarkText.style.transform);
        let finalTextX = aspRatiobyW * xyMovesText.xMove;
        let finalTextY = aspRatiobyH * xyMovesText.yMove + (0.018 * basicData.perviewCoverH); // 0.018 y move per 1px 
        let textFper = (txtObj.fontSize / basicData.previewCoverW) * 100;
        let finalTextF = (textFper * basicData.originalCoverW) / 100;

        let textFontName = "cour" ;  //
        return {
            finalTextX,
            finalTextY,
            finalTextF,
            textFontName,
            opacity : txtObj.opacity,
            color:txtObj.color,
            watermarkText : txtObj.watermarkText
        }
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
        let previewCoverW = cover.clientWidth;
        let perviewCoverH = cover.clientHeight;

        // logo w h  ==> logo height and width on preview img 
        let wmLogoImg = document.querySelector("#watermarkLogo");
        let wmLogoImgcurrWidth = wmLogoImg.clientWidth;
        let wmLogoImgcurrHeight = wmLogoImg.clientHeight - 4;

        console.log("details- ");
        console.log("original w-h- ", originalCoverW, originalCoverH);
        console.log("preview w-h- ", previewCoverW, perviewCoverH);
        console.log("logo preivew w-h- ", wmLogoImgcurrWidth, wmLogoImgcurrHeight);

        let basicData = {
            originalCoverW,
            originalCoverH,
            previewCoverW,
            perviewCoverH
        }

        // for watermark text 

        let watermarkLogo = document.getElementById('watermarkLogo');
        let xyMovesLogo = this.objectMoment(watermarkLogo.style.transform);
 

        // distance  x y 
        let aspRatiobyW = originalCoverW / previewCoverW;  // by width 
        let aspRatiobyH = originalCoverH / perviewCoverH; // by h

        // xy on original img 
        let finalX = aspRatiobyW * xyMovesLogo.xMove;
        let finalY = aspRatiobyH * xyMovesLogo.yMove;

        let fW = wmLogoImgcurrWidth * aspRatiobyW;
        let fH = wmLogoImgcurrHeight * aspRatiobyH;

        let  txtWatermarkObj = this.state.textWatermarkList[0]; 
        let  txtWatermarkObj1 = this.state.textWatermarkList[1]; 




        let finalText = this.finalTextXY( aspRatiobyW , aspRatiobyH , txtWatermarkObj , basicData );
        let finalText1 = this.finalTextXY( aspRatiobyW , aspRatiobyH , txtWatermarkObj1 , basicData );

        console.log(finalText , finalText1);

        // let finalTextX = aspRatiobyW * xyMovesText.xMove;
        // let finalTextY = aspRatiobyH * xyMovesText.yMove + (0.018 * perviewCoverH); // 0.018 y move per 1px 


        // let textFper = (this.state.fontSize / previewCoverW) * 100;
        // let finalTextF = (textFper * originalCoverW) / 100;

        // finalTextX,finalTextY,finalTextF


        // let url = `ffmpeg -i gridOrg.jpg -i box.jpg -filter_complex "[1]scale=${fW}:${fH}[a];[a]lut=a=val*0.9[b];[0][b] overlay=${finalX}:${finalY}" -y watermarkLogo.jpg`
        //let txtUrl = `ffmpeg -i gridOrg1.jpg -filter_complex "[0]drawtext=fontfile=cour.ttf:text='${this.state.watermarkText}':fontcolor=${this.state.fontColor}:fontsize=${finalTextF}:x=${finalTextX}:y=${finalTextY}" -y restextWatermark.jpg`
        // console.log(txtUrl);
        // let logoRotation = `ffmpeg -i gridOrg.jpg -i logoA.png -filter_complex "[1]scale=${fW}:${fH}[a];[a]rotate='${this.state.logoRoatation}*PI/180:ow=hypot(iw,ih):oh=ow:c=none'[a];[0][a]overlay=${finalX}:${finalY}" -y testRotation.jpg`

        let urlTextLogo = `ffmpeg -i gridOrg.jpg -i ${this.state.logoOriginalFile.name} -filter_complex "[1]scale=${fW}:${fH}[t],[t]lut=a=val*0.${this.state.logoOpacity}[t],[t]rotate=${this.state.logoRoatation}*PI/180[t],[0][t]overlay=${finalX}:${finalY}[i1];[i1]drawtext=fontfile='${finalText.textFontName}.ttf': text='${finalText.watermarkText}':fontcolor=${finalText.color}@0.${finalText.opacity}:fontsize=${finalText.finalTextF}:x=${finalText.finalTextX}:y=${finalText.finalTextY}" -y res_logoText.jpg`;

        console.log(urlTextLogo);   

        let multiLoogSinglelogUrl = `ffmpeg -i gridOrg.jpg  -i ${this.state.logoOriginalFile.name} -i ${this.state.logoOriginalFile.name} -filter_complex "[1]scale=${fW}:${fH}[t],[t]lut=a=val*0.${this.state.logoOpacity}[t],
        [t]rotate=${this.state.logoRoatation}*PI/180[t],[0][t]overlay=${finalX}:${finalY}[i1];
         [2]scale=${fW}:${fH}[t],[t]lut=a=val*0.${this.state.logoOpacity}[t],[t]rotate=${this.state.logoRoatation}*PI/180[t],[i1][t]overlay=${finalX+200}:${finalY}[i2];
         [i2]drawtext=fontfile=cour.ttf: text='India':fontcolor=red@0.8:fontsize=20:x=300:y=20" -preset ultrafast -y multiLogo.jpg
        `
        
       // (finalText , finalText1);
        let multiTextsingeLogo = `ffmpeg -i gridSm.jpg -i ${this.state.logoOriginalFile.name}
         -filter_complex "[1]scale=${fW}:${fH}[t],[t]lut=a=val*0.${this.state.logoOpacity}[t],[t]rotate=${this.state.logoRoatation}*PI/180[t],[0][t]overlay=${finalX}:${finalY}[i1];
        [i1]drawtext=fontfile=${finalText.textFontName}.ttf: text='${finalText.watermarkText}':fontcolor=${finalText.color}@0.${finalText.opacity}:fontsize=${finalText.finalTextF}:x=${finalText.finalTextX}:y=${finalText.finalTextY}[i2];
        [i2]drawtext=fontfile=${finalText1.textFontName}.ttf: text='${finalText1.watermarkText}':fontcolor=${finalText1.color}@0.${finalText1.opacity}:fontsize=${finalText1.finalTextF}:x=${finalText1.finalTextX}:y=${finalText1.finalTextY}" -preset ultrafast -y res_multy_text.jpg`
       
        console.log(multiTextsingeLogo);     
    }


    addTextWatermark = () =>{

       let vm = this;

       let userTextWatermarkList = this.state.textWatermarkList;

    
     
      //  let textOne = userTextWatermarkList[0];

        for (let i = 0; i < userTextWatermarkList.length; i++) {
            let textOne = userTextWatermarkList[i];
            
            let textOneStyle = `font-size: ${textOne.fontSize}px; opacity:0.${textOne.opacity}; font-family: ${textOne.fontFamily}; position: absolute; color:${textOne.color}`;
            let newTextWatermark = document.createElement('div'); // is a node
    
                 newTextWatermark.setAttribute("class", "draggable-text");
                 newTextWatermark.setAttribute("style", textOneStyle);
                 newTextWatermark.setAttribute("id", `${textOne.watermarkID}`);
                 console.log(newTextWatermark);
    
                 let subTextdiv = document.createElement('div');
                     subTextdiv.setAttribute("style", `transform : rotate(${textOne.textRotatation}deg)`);
                     subTextdiv.innerHTML = `${textOne.watermarkText}`;
                     newTextWatermark.appendChild(subTextdiv);
    
                     newTextWatermark.onclick = function () {
                        vm.setState({ currentEementId :`${textOne.watermarkID}` })
                        console.log("ele changed " , newTextWatermark , vm.state);
                    };

                    // add to dom 
                    document.getElementById("cover").appendChild(newTextWatermark);
        }

       

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
              
                    text Opacity : <input type="range" name="points" min="0" max="9"
                        onChange={e => this.domChangeHandler("opacity",e.target.value)} />
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
               
                    text Opacity : <input type="range" name="points" min="0" max="9"
                        onChange={e => this.domChangeHandler("opacity",e.target.value)} />


                    text : <input type="text" onChange={e => this.domChangeHandler("watermarkText" , e.target.value)} />


                    <select id="textColors" onChange={ e => this.domChangeHandler("color" , e.target.value)}>
                        <option value="red">red</option>
                        <option value="yellow">yellow</option>
                        <option value="pink">pink</option>
                        <option value="blue">blue</option>
                        </select>
                </div>

                <br />

    

                <span>
                    <button onClick={() => this.domChangeHandler("fontAdd")}>Font++</button>
                    <button onClick={() => this.domChangeHandler("fontRemove")}>Font --</button>
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