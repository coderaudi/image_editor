import interact from "interactjs"

interact(".resizable")
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

    target.style.width = event.rect.width + "px"
    target.style.height = event.rect.height + "px"
  })
