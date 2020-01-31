import React from "react";
import ReactDOM from "react-dom";

import Interactable from "../../helper/Interactable";



const draggableOptions = {
  onmove: event => {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }
};

class ResizeDrag extends React.Component {
  constructor(props) {
    super(props);

    // this.handleDrop = this.handleDrop.bind(this)

    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      droppedItems: []
    };
  }

  handleDrop(event) {
    console.log("DROP", event);
  }

  render() {
    const that = this;

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>

           <div 
           // style={{ width:"400px" , height: "300px" , background :"pink"}}
           >

                    <Interactable draggable={true}
                    resizable={true}
                        draggableOptions={draggableOptions}>
                    <div className="draggable drag-item">
                        <p>Drag Item 1</p>
                    </div>
                    </Interactable>
                    
           </div>
{/* 
        <Interactable draggable={true} 
        draggableOptions={draggableOptions}>
          <div className="draggable drag-item">
            <p>Drag Item 2</p>
          </div>
        </Interactable> */}
{/* 
        <hr />

        <Interactable
          dropzone={true}
          dropzoneOptions={{
            // only accept elements matching this CSS selector
            accept: ".drag-item",
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.75,

            // listen for drop related events:

            ondropactivate: function(event) {
              // add active dropzone feedback
              event.target.classList.add("drop-active");
            },

            ondragenter: function(event) {
              var draggableElement = event.relatedTarget,
                dropzoneElement = event.target;

              // feedback the possibility of a drop
              dropzoneElement.classList.add("drop-target");
              draggableElement.classList.add("can-drop");
              draggableElement.textContent = "Dragged in";
            },

            ondragleave: function(event) {
              // remove the drop feedback style
              event.target.classList.remove("drop-target");
              event.relatedTarget.classList.remove("can-drop");
              event.relatedTarget.textContent = "Dragged out";
            },

            ondrop: function(event) {
              that.handleDrop(event);
              event.relatedTarget.textContent = "Dropped";
            },

            ondropdeactivate: function(event) {
              // remove active dropzone feedback
              event.target.classList.remove("drop-active");
              event.target.classList.remove("drop-target");
            }
          }}
        >
          <div className="dropzone" id="outer-dropzone">
            #outer-dropzone
          </div>
        </Interactable>
      */} 
      </div>
    );
  }
}


export default ResizeDrag;