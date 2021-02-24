import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useMeasure } from "react-use";
import { Box, Heading, Text, keyframes } from '@chakra-ui/react'

const Stage = dynamic(() => import('../components/Curtain'), {
  ssr: false
});

const menuAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const MenuItem = ({ children, onHover }) => (
  <Text
    onMouseEnter={onHover}
    position="relative"
    cursor="pointer"
    transition="all cubic-bezier(0, 0.2, 0.8, 1) .3s"
    _hover={{
      transform: 'translateX(2rem)',
      fontStyle: 'italic',

      _before: {
        opacity: 1,
        transform: 'translateX(-4.6rem)',
      },
    }}
    _before={{
      content: "' '",
      opacity: 0,
      position: "absolute",
      top: '2.2rem',
      left: 0,
      display: 'block',
      width: '3.2rem',
      height: '.4rem',
      backgroundColor: 'white',
      transform: 'translateX(-6rem)',
      transition: 'all cubic-bezier(0, 0.2, 0.8, 1) .3s .2s'
    }}
  >
    {children}
  </Text>
)

export default function Home() {
  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure()
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" position="relative" minHeight="100vh">
        <Box
          position="relative"
          zIndex={2}
          display="inline-block"
          pt="12.5rem"
          pl="10rem"
          fontWeight="900"
          textTransform="uppercase"
        >
          <Box fontSize="4.2rem" lineHeight="1" animation={`.8s cubic-bezier(0, 0.2, 0.8, 1) 0s 1 ${menuAnimation}`}>
            <Heading fontSize="inherit" fontWeight="inherit" lineHeight="inherit">LeBron James</Heading>
            <Heading fontSize="inherit" fontWeight="inherit" lineHeight="inherit">The Journey</Heading>
          </Box>
          <Box pt="4rem" fontSize="3rem" animation={`.8s cubic-bezier(0, 0.2, 0.8, 1) 1s 1 ${menuAnimation} both`}>
            <MenuItem onHover={() => setCurrentIndex(1)}>St Mary St Vincent</MenuItem>
            <MenuItem onHover={() => setCurrentIndex(2)}>Cleveland Cavaliers</MenuItem>
            <MenuItem onHover={() => setCurrentIndex(3)}>Miami Heat</MenuItem>
            <MenuItem onHover={() => setCurrentIndex(4)}>Los Angeles Lakers</MenuItem>
            <MenuItem onHover={() => setCurrentIndex(5)}>Olympics</MenuItem>
          </Box>
        </Box>
        <Box
          ref={ref}
          position="absolute"
          zIndex={1}
          right={0}
          top={0}
          width="100vw"
          height="100vh"
          py="4%"
          pl="20%"
        >
          <Box
            position="relative"
            width="100%"
            height="100%"
          >
            <Stage
              width={width}
              height={height}
              currentIndex={currentIndex}
            />
          </Box>
        </Box>
      </Box>
    </div>
  )
}
