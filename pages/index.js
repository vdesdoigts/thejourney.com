import React, { useEffect, useRef, useState } from 'react'
import { useTrail, a } from 'react-spring'
import { useMeasure, useMouseWheel } from 'react-use'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Box, Flex, Heading, Text, keyframes } from '@chakra-ui/react'
import { CursorProvider } from '../contexts/Cursor'
import Cursor from '../components/Cursor'

const fast = { mass: 4, tension: 400, friction: 40 }

const scollAnim = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateY(26px);
  }
`

const Stage = dynamic(() => import('../components/Curtain'), {
  ssr: false
})

function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    x: open ? 0 : 20,
    height: open ? 54 : 0,
    from: { opacity: 1, x: 20, height: 0 },
  })

  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [trail, setTrail] = useTrail(1, () => ({ xy: [0, 0], config: () => fast }))
  const [hideCursor, setHideCursor] = useState(true)
  const [ref, { width, height }] = useMeasure()
  const mouseWheel = useMouseWheel()
  const [currentIndex, setCurrentIndex] = useState(1)
  const [currentText, setCurrentText] = useState(1)
  const isChanging = useRef(false)
  const lastWheelPosition = useRef(0)
  const total = 3
  const [open, set] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(function () {
      setTimeout(() => {
        setIsReady(true)
      }, 1000)
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
          setCurrentText(currentIndex + 1)
          set((state) => !state)
        }, 500)
      } else if (scrollDown === false && currentIndex !== 1) {
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

  return (
    <CursorProvider>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as="main"
        cursor="pointer"
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
          <Cursor key={index} xy={props.xy} opacity={hideCursor || !isReady ? 0 : 0.6} />
        ))}
        <Flex
          opacity=".6"
          position="absolute"
          zIndex={99}
          bottom="1rem"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="1.8rem" fontWeight="700" fontStyle="italic" mr={4}>scroll</Text>
          <Box
            position="relative"
            width=".4rem"
            height="3rem"
          >
            <Box
              content=" "
              position="absolute"
              width=".4rem"
              height=".4rem"
              background="#fff"
              top=".3rem"
              borderRadius=".4rem"
              animation={`${scollAnim} 1.5s linear infinite`}
            />
          </Box>
          <Text fontSize="1.8rem" fontWeight="700" fontStyle="italic" ml={4}>down</Text>
        </Flex>
        <Flex
          position="relative"
          zIndex={2}
          minHeight="100vh"
          direction="column"
          alignItems="center"
          justifyContent="center"
          pr="20rem"
          opacity={isReady ? 1 : 0}
          transform={isReady ? 'translateY(0)' : 'translateY(-1rem)'}
          transition="all ease .5s"
        >
          <Box>
            <Text as="span" fontSize="3rem" fontWeight="700" fontStyle="italic" mr={4}>the journey of</Text>
            <Heading textAlign="right" fontSize="7rem" fontWeight="800" lineHeight=".75" textTransform="uppercase" letterSpacing={2}>LeBron <br/> James</Heading>
          </Box>
          <Flex direction="row" justifyContent="center">
            <Text width="9rem" ml="47.6rem" fontSize="3rem" fontWeight="700" fontStyle="italic" lineHeight="1" mr={4}>with the</Text>
            <Heading position="relative" width="50rem" fontSize="7rem" fontWeight="800" lineHeight=".75" textTransform="uppercase" letterSpacing={2}>
              <Trail open={open}>
                {currentText === 1 && <span>Los Angeles</span>}
                {currentText === 1 && <span>Lakers</span>}
                {currentText === 2 && <span>Miami</span>}
                {currentText === 2 && <span>Heat</span>}
                {currentText === 3 && <span>Cleveland</span>}
                {currentText === 3 && <span>Cavaliers</span>}
              </Trail>
            </Heading>
          </Flex>
        </Flex>
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
