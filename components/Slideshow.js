import React, { useRef, useState, useEffect } from 'react'
import { Plane, useCurtains } from 'react-curtains'
import gsap from 'gsap'
import { vertexShader, fragmentShader } from './shaders'

// https://codesandbox.io/s/react-curtains-slideshow-i7uim?file=/src/components/Slideshow/index.js:2143-2159
function Slideshow({ currentIndex, isChanging, onChanging }) {
  const slideshowInner = useRef(null)
  const tween = useRef(null)
  const activeTex = useRef(null)
  const nextTex = useRef(null)

  const [plane, setPlane] = useState(null)

  useEffect(() => {
    let currentTween = tween.current

    return () => {
      if (currentTween) {
        currentTween.kill()
      }
    };
  }, [])

  const uniforms = {
    transitionTimer: {
      name: 'uTransitionTimer',
      type: '1f',
      value: 0,
    }
  }

  const onLoading = (plane, texture) => {
    texture.setMinFilter(texture.gl.LINEAR_MIPMAP_NEAREST)
  }

  const onReady = (plane) => {
    setPlane(plane)
  }

  useEffect(() => {
    if (!isChanging && plane) {
      onChanging(true)
      let nextTextureIndex
      nextTextureIndex = currentIndex
      nextTex.current.setSource(plane.images[nextTextureIndex])

      tween.current = gsap.to(plane.uniforms.transitionTimer, {
        duration: 1.75,
        value: 90,
        ease: "power2.inOut",
        onComplete: () => {
          onChanging(false)
          tween.current = null

          plane.uniforms.transitionTimer.value = 0

          const activeTextureIndex = nextTextureIndex
          activeTex.current.setSource(plane.images[activeTextureIndex])
        }
      });
    }
  }, [currentIndex])

  useCurtains(
    (curtains) => {
      if (plane) {
        activeTex.current = plane.createTexture({
          sampler: 'activeTex',
          fromTexture: plane.textures[currentIndex]
        })
        nextTex.current = plane.createTexture({
          sampler: 'nextTex',
          fromTexture: plane.textures[currentIndex + 1],
        })
      }
    },
    [plane]
  )

  return (
    <Plane
      className="Slideshow"
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      onLoading={onLoading}
      onReady={onReady}
    >
      <div ref={slideshowInner}>
        <img
          src="https://www.curtainsjs.com/examples/medias/displacement.jpg"
          data-sampler="displacement"
          alt=""
        />
        <img src="/images/los-angeles-lakers.jpg" alt="" />
        <img src="/images/miami-heat.jpg" alt="" />
        <img src="/images/cleveland-cavaliers.jpg" alt="" />
        <img src="https://unsplash.it/1920/1080?random=4" alt="" />
        <img src="https://unsplash.it/1920/1080?random=5" alt="" />
        {/* <img src="https://unsplash.it/1920/1080?random=6" alt="" /> */}
        {/* <img src="https://unsplash.it/1920/1080?random=7" alt="" /> */}
      </div>
    </Plane>
  );
}

export default Slideshow;
