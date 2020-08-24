import React, { Component } from 'react';


import ReactPlayer from 'react-player'
const interact = require('interactjs');
let style={ background :"red" , margin : "20px" , height : "500px" , width : "1000px" };

class VideoEditor extends Component {

    
     dragMoveListener  = (event) => {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
      
        // translate the element
        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)'
      
        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    
    componentDidMount(){


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

              //resiz
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

        interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
    //   interact.modifiers.restrictRect({
    //     restriction: 'parent',
    //     endOnly: true
    //   })
    ],
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: this.dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p')

      textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                   Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px')
    }
  })
    }

    render() {
        return (
            
            <div> 
            <div style={{ height : "1000px"}}>
                Video editor
                </div>

           
               <div
                style={style} >
                <div className="draggable-logo" >
                   <ReactPlayer url='https://www.dailymotion.com/video/x5e9eog'
                    playing  
                    className="resizable-logo"
                    
                    />
                    </div>
                 
             </div>


                <div className="draggable" style={{ padding : "10px" , background : "yellow" , width : "fit-content"}}>
                    Video
                    <div
                     className="resizable-logo"
                     style={{ padding : "10px" , background : "pink" , width : "fit-content"}}
                     >
                       <ReactPlayer url='https://www.dailymotion.com/video/x5e9eog'
                       width="100%"
                       height="auto" 
                       playing />
                   </div>
                </div>

             <br />   <br />   <br />   <br />   <br />   <br />
             </div>
        );
    }
}

export default VideoEditor;