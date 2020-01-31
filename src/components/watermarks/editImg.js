import React, { Component } from 'react';
import demoImg from "../../assets/ntr5.jpg";
import waterMark from "../../assets/logo3.jpg";


import "./index.css";
const interact = require('interactjs')



class EditIMG extends Component {


    constructor(props){
        super(props);

        this.state={
            fontSize : 20,
            rotate :20,
            opacity : 9
        }
    }

    componentDidMount() {


        // drag the element on page 
        const position = { x: 0, y: 0 }
        interact('.draggable-logo').draggable({
          listeners: {
            start (event) {
             // console.log(event.type, event.target)
            },
            move (event) {
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
                      min: { width: 100, height: 50 }
                    })
                  ],
            })
            .on("resizemove", function(event) {
                var target = event.target
                console.log(target);
                target.style.width = event.rect.width + "px"
                target.style.height = event.rect.height + "px"
            })


            // text drag(move)
            interact('.draggable-text').draggable({
              listeners: {
                start (event) {
                 // console.log(event.type, event.target)
                },
                move (event) {
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



    addFont = () => {
 
        this.setState({
            fontSize : this.state.fontSize + 1 
        })
    }

    removeFont = () => {
  
        this.setState({
            fontSize : this.state.fontSize - 1 
        })
    }

    reduceOpacity = () => {
  
        this.setState({
            opacity : this.state.opacity - 1 
        })
    }
    
    increaseOpacity = () => {
  
        this.setState({
            opacity : this.state.opacity + 1 
        })
    }


    




    render() {

        let textStyle={
            background : "red",
            fontSize : this.state.fontSize,
            opacity :  `0.${this.state.opacity}`
        }

        return (
            <div>
      
          <span>
          <button onClick={() => this.addFont()}>Font+</button> 
            <button onClick={() => this.removeFont()}>Font -</button>

            <button onClick={() => this.reduceOpacity()}>Opacity -- </button>
            <button onClick={() => this.increaseOpacity()}>Opacity ++</button>
          </span>
             <hr />


                            <div className="baseImg">
                            {/* <img src={demoImg}  width="500px" /> */}
                            </div>

                          

                
                           



                    <hr />

                    <div className="editor-console" >

                            <div  className="draggable-text"> 
                                <span style={textStyle} > watermarkText_one </span>
                            </div>

                    

                    <div  className="draggable-logo"> 
                                <img src={waterMark}  width="150px"
                                // className="resizable-logo" 
                                 />
                            </div>

                    </div>


            </div>
        );
    }
}

export default EditIMG;