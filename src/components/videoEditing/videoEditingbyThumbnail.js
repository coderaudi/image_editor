import React, { Component } from 'react';

import "./index.css";
const interact = require('interactjs')


class VideoEditingThumbnail extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentEementId: null,
            logoWatermarkList: [],
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

            logoOriginalFile: null,
            originalFile: null,

            // image parameters
            actualImgWidth: 1280,
            actualImgHeight: 720
        }

        this.textRotationAngle = 10;
        this.textWatermarkCount = 0;
        this.logoWatermarkCount = 0;

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



    handleChange = (event) => {

        if (event.target.files[0]) {
            this.setState({
                file: URL.createObjectURL(event.target.files[0]),
                originalFile: event.target.files[0]
            })
        }
    }


    handleLogoFile = (event) => {
        if (event.target.files[0]) {
            let oldList = this.state.logoWatermarkList
            oldList.push(event.target.files[0]);
            this.setState({
                logoWatermarkList: oldList
            })
        }
    }

    removeDomElement = (e) => {
        let id = this.state.currentEementId;
        if (id &&  document.getElementById(id)) document.getElementById(id).remove();

        // remove from logo array also 
    }


    domChangeHandler = (changeParameter, value) => {

        // update the element 

        let modifingElement = this.state.currentEementId;

        if (modifingElement) {
            console.log("changing element ", modifingElement)
            let ele = document.getElementById(modifingElement);
            console.log(document.getElementById(modifingElement).childNodes[0].innerText);

            if (changeParameter === "color") {
                ele.style.color = value ? value : "black";
            }

            if (changeParameter === "logoRotate") {

                if (modifingElement.includes("logo")) {
                    ele.childNodes[0].style.transform = `rotate(${value}deg)` // only logo rotation
                }
            }


            if (changeParameter === "opacity") {
                ele.style.opacity = value ? `0.${value}` : "0.9";
            }

            if (changeParameter === "textRange") {

                if (modifingElement.includes("logo")) {
                    ele.children[0].width = value;
                    ele.children[0].height = value;
                } else {
                    console.log(value);
                    ele.style.fontSize = `${value}px`;
                }
            }

            if (changeParameter === "watermarkText") {
                if (value) {
                    document.getElementById(modifingElement).childNodes[0].innerText = value
                } else {
                    document.getElementById(modifingElement).childNodes[0].innerText = "Click To Edit"
                }
            }

        }
    }


    finalLogoXY = (aspRatiobyW, aspRatiobyH) => {
        let vm = this;
        let finalLogoWatermarkList = [];
        let jsonArrayLogoWatermarkObj = [];
        for (let index = 0; index < vm.logoWatermarkCount; index++) {

            let watermarkLogo = document.getElementById(`logo-watermark-${index}`);

            if (watermarkLogo) {

                let wmLogoImgcurrWidth = watermarkLogo.clientWidth;
                let wmLogoImgcurrHeight = watermarkLogo.clientHeight - 4;

                let xyMovesLogo = this.objectMoment(watermarkLogo.style.transform);

                let rotationAngle = parseInt(watermarkLogo.childNodes[0].style.transform.replace(/\D/g, ""), 10);
                //  console.log("LLL chck", watermarkLogo, rotationAngle);
                // xy on original img 
                let finalX = aspRatiobyW * xyMovesLogo.xMove;
                let finalY = aspRatiobyH * xyMovesLogo.yMove;

                // final height and with of logo img and opacity
                let fW = wmLogoImgcurrWidth * aspRatiobyW;
                let fH = wmLogoImgcurrHeight * aspRatiobyH;
                let opacity = watermarkLogo.style.opacity;

                finalLogoWatermarkList.push({
                    finalX, finalY, fW, fH, opacity,
                    rotationAngle: rotationAngle ? rotationAngle : 0
                })

                jsonArrayLogoWatermarkObj.push({
                watermarkPath: 'C:/Users/purushottam.rajdev/Documents/Watermark/testing/logoA.png',
                positionX: finalX,
                positionY: finalY,
                width: fW,
                hieght: fH,
                opacity: opacity,
                isLogo: 1,
                rotation: rotationAngle ? rotationAngle : 0
                })

                

            }

        }

        return jsonArrayLogoWatermarkObj;


    }


    finalTextXY = (aspRatiobyW, aspRatiobyH, basicData) => {

        let vm = this;
        let finalTextWatermarkList = [];

        let jsonArrayTextWatermarkObj = []

        for (let index = 0; index < vm.textWatermarkCount; index++) {

            let textElement = document.getElementById(`txt-watermark-${index}`);
            if (textElement) {
                console.log(textElement);

                let watermarkObj = {
                    fontSize: parseInt(textElement.style.fontSize, 10),
                    watermarkID: textElement.id,
                    opacity: textElement.style.opacity,
                    fontFamily: textElement.style.fontFamily,
                    position: "absolute",  // keep same for all
                    color: textElement.style.color,
                    watermarkText: textElement.childNodes[0].innerText,
                    textRotatation: 0
                    // transformOrigin: "0 0"
                }

                //let waterMarkText = document.getElementById(txtObj.watermarkID);
                let xyMovesText = this.objectMoment(textElement.style.transform);
                let finalTextX = aspRatiobyW * xyMovesText.xMove;
                let finalTextY = aspRatiobyH * xyMovesText.yMove; // 0.018 y move per 1px   + (0.018 * basicData.perviewCoverH)
                let textFper = (watermarkObj.fontSize / basicData.previewCoverW) * 100;
                let finalTextF = (textFper * basicData.originalCoverW) / 100;

                let textFontName = "cour";  //
                finalTextWatermarkList.push({
                    finalTextX,
                    finalTextY,
                    finalTextF,
                    textFontName,
                    opacity: watermarkObj.opacity,
                    color: watermarkObj.color,
                    watermarkText: watermarkObj.watermarkText
                });

                jsonArrayTextWatermarkObj.push({
                    "isLogo": 0,
                    "positionX": finalTextX,
                    "positionY": finalTextY,
                    "opacity": watermarkObj.opacity,
                    "watermarkText": watermarkObj.watermarkText,
                    "fontColor": watermarkObj.color,
                    "fontSize": finalTextF,
                    "font" : textFontName,
                  })

            }

        }

        console.log(finalTextWatermarkList);
        return jsonArrayTextWatermarkObj;
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



        let basicData = {
            originalCoverW,
            originalCoverH,
            previewCoverW,
            perviewCoverH
        }

        console.log("details- ", basicData);
        // for watermark text 


        // distance  x y 
        let aspRatiobyW = originalCoverW / previewCoverW;  // by width 
        let aspRatiobyH = originalCoverH / perviewCoverH; // by h



        let resList = this.finalTextXY(aspRatiobyW, aspRatiobyH, basicData);
        let resLogoList = this.finalLogoXY(aspRatiobyW, aspRatiobyH, basicData);


        console.log(resList, resLogoList);

        //  let finalText1 = this.finalTextXY(aspRatiobyW, aspRatiobyH, txtWatermarkObj1, basicData);

         let jsonReq =  {
            originalResoursePath: 'C:/Users/purushottam.rajdev/Documents/Watermark/testing/gridOrg.jpg',
            watermarkList : [...resList , ...resLogoList]
          }
          
          

          console.log(JSON.stringify(jsonReq));

        // let finalText = resList[0];  // text 1 watermark
        // let finalText1 = resList[1]; // text 2 watermark
        // let finalLogo1 = resLogoList[0]; // logo 1 watermark

        // if (finalLogo1) {

        //     let fW = finalLogo1.fW;
        //     let fH = finalLogo1.fH;
        //     let finalX = finalLogo1.finalX;
        //     let finalY = finalLogo1.finalY;
        //     let finalLogoOpacity = finalLogo1.opacity;
        //     let logoRotatation = finalLogo1.rotationAngle;


            // let finalTextX = aspRatiobyW * xyMovesText.xMove;
            // let finalTextY = aspRatiobyH * xyMovesText.yMove + (0.018 * perviewCoverH); // 0.018 y move per 1px 


            // let textFper = (this.state.fontSize / previewCoverW) * 100;
            // let finalTextF = (textFper * originalCoverW) / 100;

            // finalTextX,finalTextY,finalTextF


            // let url = `ffmpeg -i gridOrg.jpg -i box.jpg -filter_complex "[1]scale=${fW}:${fH}[a];[a]lut=a=val*0.9[b];[0][b] overlay=${finalX}:${finalY}" -y watermarkLogo.jpg`
            //let txtUrl = `ffmpeg -i gridOrg1.jpg -filter_complex "[0]drawtext=fontfile=cour.ttf:text='${this.state.watermarkText}':fontcolor=${this.state.fontColor}:fontsize=${finalTextF}:x=${finalTextX}:y=${finalTextY}" -y restextWatermark.jpg`

            // console.log(txtUrl);

            // let logoRotation = `ffmpeg -i gridOrg.jpg -i logoA.png -filter_complex "[1]scale=${fW}:${fH}[a];[a]rotate='${this.state.logoRoatation}*PI/180:ow=hypot(iw,ih):oh=ow:c=none'[a];[0][a]overlay=${finalX}:${finalY}" -y testRotation.jpg`

            // let urlTextLogo = `ffmpeg -i gridOrg.jpg -i ${this.state.logoOriginalFile.name} -filter_complex "[1]scale=${fW}:${fH}[t],[t]lut=a=val*0.${this.state.logoOpacity}[t],[t]rotate=${this.state.logoRoatation}*PI/180[t],[0][t]overlay=${finalX}:${finalY}[i1];[i1]drawtext=fontfile='${finalText.textFontName}.ttf': text='${finalText.watermarkText}':fontcolor=${finalText.color}@0.${finalText.opacity}:fontsize=${finalText.finalTextF}:x=${finalText.finalTextX}:y=${finalText.finalTextY}" -y res_logoText.jpg`;

            // console.log(urlTextLogo);

            // let multiLoogSinglelogUrl = `ffmpeg -i gridOrg.jpg  -i ${this.state.logoOriginalFile.name} -i ${this.state.logoOriginalFile.name} -filter_complex "[1]scale=${fW}:${fH}[t],[t]lut=a=val*0.${this.state.logoOpacity}[t],
            // [t]rotate=${this.state.logoRoatation}*PI/180[t],[0][t]overlay=${finalX}:${finalY}[i1];
            //  [2]scale=${fW}:${fH}[t],[t]lut=a=val*0.${this.state.logoOpacity}[t],[t]rotate=${this.state.logoRoatation}*PI/180[t],[i1][t]overlay=${finalX + 200}:${finalY}[i2];
            //  [i2]drawtext=fontfile=cour.ttf: text='India':fontcolor=red@0.8:fontsize=20:x=300:y=20" -preset ultrafast -y multiLogo.jpg
            // `

            // (finalText , finalText1);
        //     let multiTextsingeLogo = `ffmpeg -i gridOrg.jpg -i logoA.png
        //  -filter_complex "[1]scale=${fW}:${fH}[t],[t]lut=a=val*${finalLogoOpacity}[t],[t]rotate=${logoRotatation}*PI/180[t],[0][t]overlay=${finalX}:${finalY}[i1];
        // [i1]drawtext=fontfile=${finalText.textFontName}.ttf: text='${finalText.watermarkText}':fontcolor=${finalText.color}@${finalText.opacity}:fontsize=${finalText.finalTextF}:x=${finalText.finalTextX}:y=${finalText.finalTextY}[i2];
        // [i2]drawtext=fontfile=${finalText1.textFontName}.ttf: text='${finalText1.watermarkText}':fontcolor=${finalText1.color}@${finalText1.opacity}:fontsize=${finalText1.finalTextF}:x=${finalText1.finalTextX}:y=${finalText1.finalTextY}" -preset ultrafast -y res_multy_text.jpg`

            //console.log(multiTextsingeLogo);


           // let logoRotate_url = `ffmpeg -y -i gridOrg.jpg -i logoA.png -filter_complex "[1]scale=${fW}:${fH}[scale];[scale]lut=a=val*${finalLogoOpacity}[scale];[scale]rotate=${logoRotatation}*PI/180:ow='rotw(${logoRotatation}*PI/180)':oh='roth(${logoRotatation}*PI/180):c=black@0'[rotate];[0][rotate]overlay=${finalX}-((overlay_w-${fW})/2):${finalY}-((overlay_h-${fH})/2)" testRotation.jpg`;
            //console.log("rotate url ", logoRotate_url);



        // }
    }


    addLogoWatermark = () => {

        let vm = this;
        let logoList = vm.state.logoWatermarkList;
        let lastIndex = logoList.length - 1;

        // let logoStyle = {
        //     width: this.state.logoSize,
        //     opacity: `0.${this.state.logoOpacity}`,
        //     transform: `rotate(${this.state.logoRoatation}deg)`
        // }



        if (logoList[lastIndex]) {

            let logoPreviewUrl = URL.createObjectURL(logoList[lastIndex]);
            // URL.createObjectURL(

            // <div className="draggable-logo"
            // id="watermarkLogo"
            // style={{ position: "absolute" }} >
            // <img src={this.state.logoFile}
            //     id="watermarkLogoImg"
            //     style={logoStyle}

            //     className="resizable-logo"
            //     />
            // </div>



            //     let vm = this;
            let defaultLogo = {
                watermarkID: `logo-watermark-${vm.logoWatermarkCount}`,
                opacity: 9,
                position: "absolute",  // keep same for all
                logoRotatation: 0
            }

            let logoOne = defaultLogo;
            let logoStyle = `opacity:0.${logoOne.opacity};  position: absolute; `;
            let newLogoWatermark = document.createElement('div'); // is a node
            newLogoWatermark.setAttribute("class", "draggable-logo");
            newLogoWatermark.setAttribute("style", logoStyle);
            newLogoWatermark.setAttribute("id", `${logoOne.watermarkID}`);
            let subImgDiv = document.createElement('IMG');
            subImgDiv.setAttribute("src", logoPreviewUrl);
            subImgDiv.setAttribute("width", "80");
            subImgDiv.setAttribute("height", "80");
            subImgDiv.setAttribute("class", "resizable-logo");
            subImgDiv.setAttribute("alt", `img-${logoOne.watermarkID}`);

            //     subImgDiv.setAttribute("style", `transform : rotate(${logoOne.logoRotatation}deg)`);
            //     // subImgDiv.innerHTML = `${logoOne.watermarkText}`;
            newLogoWatermark.appendChild(subImgDiv);
            console.log(newLogoWatermark);

            newLogoWatermark.onclick = function () {
                vm.setState({ currentEementId: `${logoOne.watermarkID}` })
                console.log("ele changed ", newLogoWatermark, vm.state);
            };

            //     // add to dom 
            document.getElementById("cover").prepend(newLogoWatermark);
            vm.logoWatermarkCount++;

            console.log("img added");
        }



    }



    addTextWatermark = () => {

        let vm = this;
        let defaultText = {
            fontSize: 20,
            watermarkID: `txt-watermark-${vm.textWatermarkCount}`,
            opacity: 9,
            fontFamily: "Courier New",
            position: "absolute",  // keep same for all
            color: "red",
            watermarkText: "New Watermark",
            textRotatation: 0
        }
  
            let textOne = defaultText

            let textOneStyle = `font-size: ${textOne.fontSize}px; opacity:0.${textOne.opacity}; font-family: ${textOne.fontFamily}; position: absolute; color:${textOne.color}`;
            let newTextWatermark = document.createElement('div'); // is a node

            newTextWatermark.setAttribute("class", "draggable-text");
            newTextWatermark.setAttribute("style", textOneStyle);
            newTextWatermark.setAttribute("id", `${textOne.watermarkID}`);
            console.log(newTextWatermark);

            let subTextdiv = document.createElement('div');
            subTextdiv.setAttribute("style", `transform : rotate(${textOne.textRotatation}deg); line-height: 0.75em;`);
            subTextdiv.innerHTML = `${textOne.watermarkText}`;
            newTextWatermark.appendChild(subTextdiv);

            newTextWatermark.onclick = function () {
                vm.setState({ currentEementId: `${textOne.watermarkID}` })
                console.log("ele changed ", newTextWatermark, vm.state);
            };

            // add to dom 
            document.getElementById("cover").appendChild(newTextWatermark);
            vm.textWatermarkCount++;
        
    }

    render() {

        let editorConsole = {
            position: "relative",
            backgroundImage: `url(${this.state.file})`,
            width: "500px",
            height: "281px",
        }



        return (
            <div>

                <div>
                    <h4>User Video Thumbnail input</h4>
                    cover: <input type="file" onChange={this.handleChange} />
                    logo : <input type="file" onChange={this.handleLogoFile} />
                    <button onClick={() => { this.addLogoWatermark() }}>Add Logo</button>

                    <br />

                    text Editor :
                    text : <input type="text" onChange={e => this.domChangeHandler("watermarkText", e.target.value)} />
                    <select id="textColors" onChange={e => this.domChangeHandler("color", e.target.value)}>
                        <option value="red">red</option>
                        <option value="yellow">yellow</option>
                        <option value="pink">pink</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>
                    </select>

                    Logo Rotation <input type="range" name="logoRotate" min={0} max={360}
                        onChange={e => this.domChangeHandler("logoRotate", e.target.value)} />

                    Opacity : <input type="range" name="points" min="1" max="9"
                        onChange={e => this.domChangeHandler("opacity", e.target.value)} />
                    Size : <input type="range" name="points" min="5" max="100"
                        onChange={e => this.domChangeHandler("textRange", e.target.value)} />
                    <br />


                    {/* logoRotate <input type="number" onChange={ (e) => this.setState({ textRotatation : parseInt(e.target.value, 10)})} />  */}



                </div>

                <span>

                    <button onClick={() => this.checkImg()}> check Img</button>
                    <button onClick={() => this.addTextWatermark()} > Add Text</button>
                    <button onClick={() => this.removeDomElement()} >Remove Ele</button>

                </span>
                <hr />

                <div className="watermark-playground">

                    <div className="editor-console"
                        id="cover"
                        style={editorConsole}
                    >

                        {/* <div className="draggable-logo"
                            id="watermarkLogo"
                            style={{ position: "absolute" }} >
                            <img src={this.state.logoFile}
                                id="watermarkLogoImg"
                                style={logoStyle}

                                className="resizable-logo"
                            />
                        </div> */}

                    </div>

                </div>



                <br />
                <br />


            </div>
        );
    }
}

export default VideoEditingThumbnail;