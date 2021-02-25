import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useMeasure, useMouseWheel } from 'react-use'
import { Box, Flex, Heading, Text, keyframes } from '@chakra-ui/react'
import { useTrail, a } from 'react-spring'

const Stage = dynamic(() => import('../components/Curtain'), {
  ssr: false
})

function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    // opacity: open ? 1 : 0,
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
  const [ref, { width, height }] = useMeasure()
  const mouseWheel = useMouseWheel()
  const [currentIndex, setCurrentIndex] = useState(1)
  const [currentText, setCurrentText] = useState(1)
  const isChanging = useRef(false)
  const lastWheelPosition = useRef(0)
  const total = 5
  const [open, set] = useState(true)

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
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as="main"
        position="relative"
        minHeight="100vh"
      >
        <Flex
          position="relative"
          zIndex={2}
          minHeight="100vh"
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            textAlign="right"
          >
            <Heading fontSize="7rem" fontWeight="800" lineHeight=".75" textTransform="uppercase" letterSpacing={2}>LeBron <br/> James</Heading>
          </Box>
          <Flex direction="row" justifyContent="center">
            <Text width="9rem" ml="47.6rem" fontSize="3rem" fontWeight="700" fontStyle="italic" mr={4}>with the</Text>

            <Heading position="relative" width="50rem" fontSize="7rem" fontWeight="800" lineHeight=".75" textTransform="uppercase" letterSpacing={2}>
              <Trail open={open}>
                {currentText === 1 && <span>Los Angeles</span>}
                {currentText === 1 && <span>Lakers</span>}
                {currentText === 2 && <span>Miami</span>}
                {currentText === 2 && <span>Heat</span>}
                {currentText === 3 && <span>Cleveland</span>}
                {currentText === 3 && <span>Cavaliers</span>}
              </Trail>
                {/* <Span current={currentIndex === 1} prev={currentIndex === 2}>Los Angeles</Span> <br/> <Span current={currentIndex === 1} prev={currentIndex === 2}>Lakers</Span>
                <Span current={currentIndex === 2} prev={currentIndex === 3}>Miami</Span> <br/> <Span current={currentIndex === 2} prev={currentIndex === 3}>Heat</Span>
                <Span current={currentIndex === 3} prev={currentIndex === 4}>Cleveland</Span> <br/> <Span current={currentIndex === 3} prev={currentIndex === 4}>Cavaliers</Span>
                <Span current={currentIndex === 4}>St Mary</Span> <br/> <Span current={currentIndex === 4}>St Vincent</Span> */}
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
            backgroundColor="rgba(0, 0, 0, .44)"
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
    </div>
  )
}
