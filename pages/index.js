import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useTrail, a } from 'react-spring'
import { useMeasure, useMouseWheel } from 'react-use'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import { useAnimation } from 'framer-motion'
import { CursorProvider } from '../contexts/Cursor'
import Cursor from '../components/Cursor'
import LinkOverlay from '../components/LinkOverlay'
import Headline from '../components/Headline'
import ScrollDown from '../components/ScrollDown'

const routes = [
  '/los-angeles-lakers',
  '/miami-heat',
  '/cleveland-cavaliers',
]

const hashes = [
  '#los-angeles-lakers',
  '#miami-heat',
  '#cleveland-cavaliers',
]

const Stage = dynamic(() => import('../components/Curtain'), {
  ssr: false
})

const Home = (props) => {
  console.log('hash: ', props)
  const router = useRouter()
  console.log('router: ', router)
  console.log('router: ', router.asPath)
  const controls = useAnimation()
  const [trail, setTrail] = useTrail(1, () => ({ xy: [0, 0], config: () => ({ mass: 4, tension: 400, friction: 40 }) }))
  const [ref, { width, height }] = useMeasure()
  const mouseWheel = useMouseWheel()

  const [hideCursor, setHideCursor] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(router.asPath === `/${hashes[0]}`
    ? 1
    : router.asPath === `/${hashes[1]}`
      ? 2
      : router.asPath === `/${hashes[2]}`
        ? 3
        : 1 
  )
  const [currentText, setCurrentText] = useState(router.asPath === `/${hashes[0]}`
    ? 1
    : router.asPath === `/${hashes[1]}`
      ? 2
      : router.asPath === `/${hashes[2]}`
        ? 3
        : 1 
  )
  const [open, set] = useState(true)

  const isChanging = useRef(false)
  const lastWheelPosition = useRef(0)
  const total = 3

  useEffect(() => {
    document.fonts.ready.then(function () {
      controls.start('visible')
    })
  }, [])

  useEffect(() => {
    if (!isChanging.current) {
      const lastWheelPositionPositive = Math.sign(lastWheelPosition.current)
      const mouseWheelPositive = Math.sign(mouseWheel)
      let scrollDown = null

      if (lastWheelPositionPositive && mouseWheelPositive) {
        scrollDown = mouseWheel > lastWheelPosition.current
      } else if (lastWheelPositionPositive === -1 && mouseWheelPositive === -1) {
        scrollDown = Math.abs(mouseWheel) > Math.abs(lastWheelPosition.current)
      }

      if (scrollDown && currentIndex !== total) {
        setCurrentIndex(currentIndex + 1)
        set((state) => !state)
        setTimeout(() => {
          router.replace(`/${hashes[currentIndex]}`)
          setCurrentText(currentIndex + 1)
          set((state) => !state)
        }, 500)
      } else if (scrollDown === false && currentIndex !== 1) {
        router.replace(`/${hashes[currentIndex - 2]}`)
        setCurrentIndex(currentIndex - 1)
        set((state) => !state)
        setTimeout(() => {
          setCurrentText(currentIndex - 1)
          set((state) => !state)
        }, 500)
      }
    }
    lastWheelPosition.current = mouseWheel
  }, [mouseWheel])

  const onChanging = (value) => {
    isChanging.current = value
  }

  const getCurrentIndexByHash = () => {
    const index = hashes.findIndex((hash) => hash === window.location.hash)

    if (index !== -1) {
      return index + 1
    }

    return 1
  }

  return (
    <CursorProvider>
      <Head>
        <title>The Journey of LeBron James</title>
      </Head>

      <Box
        display="block"
        position="relative"
        minHeight="100vh"
        onMouseMove={(e) => {
          if (hideCursor) {
            setHideCursor(false)
          }
          setTrail({ xy: [e.clientX, e.clientY] })
        }}
      >
        {trail.map((props, index) => (
          <Cursor key={index} xy={props.xy} opacity={hideCursor ? 0 : 0.6} />
        ))}

        <LinkOverlay href={routes[currentIndex - 1]} />
        <ScrollDown />

        <Headline open={open} currentText={currentText} />

        <Box
          ref={ref}
          position="absolute"
          zIndex={1}
          top={0}
          right={0}
          width="100vw"
          height="100vh"
        >
          <Box
            position="absolute"
            zIndex={2}
            top={0}
            right={0}
            width="100vw"
            height="100vh"
            backgroundColor="rgba(0, 0, 0, .54)"
          />
          <Box
            position="relative"
            width="100%"
            height="100%"
          >
            <Stage
              width={width}
              height={height}
              currentIndex={currentIndex}
              isChanging={isChanging.current}
              onChanging={onChanging}
            />
          </Box>
        </Box>
      </Box>
    </CursorProvider>
  )
}

export default Home
