import React from "react";
import gsap from "gsap";
import { Curtains, useCurtains } from "react-curtains";
import Slideshow from './Slideshow'

function App(props) {
  useCurtains((curtains) => {
    // use gsap ticker to render our curtains scene
    gsap.ticker.add(curtains.render.bind(curtains));
  });

  return (
    <div className="App">
      <Slideshow {...props} />
    </div>
  );
}

export default function CurtainWrapper(props) {
  return (
    <Curtains
      pixelRatio={Math.min(1.5, window.devicePixelRatio)}
      autoRender={false}
    >
      <App {...props} />
    </Curtains>
  )
}
