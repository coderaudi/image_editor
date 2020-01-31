import React, { Component } from 'react';
import demoImg from "../../assets/ntr5.jpg";
import waterMark from "../../assets/logo1.jpg";

const interact = require('interactjs')

class InteractJS extends Component {

    componentDidMount(){
        interact(".resizable-logo")
        .resizable({
                edges: { left: false, right: true, bottom: true, top: false },
                // modifiers: [
                //   interact.modifiers.restrictEdges({
                //     outer: "parent",
                //     endOnly: true
                //   })
                // ],
                inertia: true
            })
            .on("resizemove", function(event) {
                var target = event.target
                console.log(target);
                target.style.width = event.rect.width + "px"
                target.style.height = event.rect.height + "px"
            })


            // drag 

            let element = document.getElementById('grid-snap')
            let x = 0; let y = 0

            interact(element)
                .draggable({
                    modifiers: [
                    interact.modifiers.snap({
                        targets: [
                        interact.createSnapGrid({ x: 30, y: 30 })
                        ],
                        range: Infinity,
                        relativePoints: [ { x: 0, y: 0 } ]
                    }),
                    interact.modifiers.restrict({
                        restriction: element.parentNode,
                        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                        endOnly: true
                    })
                    ],
                    inertia: true
                })
                .on('dragmove', function (event) {
                    x += event.dx
                    y += event.dy


                    console.log(`x:=${x} y:=${y}`);

                    event.target.style.webkitTransform =
                    event.target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)'
                })


                // resizeing - drag 

  interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
  .draggable({
    onmove: window.dragMoveListener,
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ]
  })
  .on('resizemove', function (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    // update the element's style
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'

    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)'

    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
  })

    }





  
      



    render() {
        return (
            <div>
                <h2>Img resizable </h2>
              
                    <img src={demoImg}  className="resizable" />


                    {/* <div className="draggable" id="grid-snap">
                        drag user 
                    </div> */}

                    <div className="dragmove" style={{ width: "900px" , height :"500px" , background : "greenyellow"}}>

                        
                   <div className="draggable" id="grid-snap">
                        drag user 
                    </div> 

                    </div>


                    <hr />


                    {/* <div className="draggable" id="grid-snap">
                       <img src={demoImg}  className="resizable " />
                    </div> */}


                <hr />


              
                <div className="resizemove" style={{ background : "pink" , width: "1000px" , height :"1000px"}}>

                <div className="resize-drag draggable">
                     resize-drag
                </div>

                    move on 
                </div>

                    
                
            </div>
        );
    }
}

export default InteractJS;