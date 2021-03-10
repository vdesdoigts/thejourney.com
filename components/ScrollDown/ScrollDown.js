import React, { useEffect, memo } from 'react'
import { Box, Text, keyframes } from '@chakra-ui/react'
import { useAnimation } from 'framer-motion'
import MotionBox from '../MotionBox'

const scollAnim = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateY(26px);
  }
`

const ScrollDown = () => {
  const controls = useAnimation()

  useEffect(() => {
    document.fonts.ready.then(function () {
      controls.start('visible')
    })
  }, [])

  return (
    <MotionBox
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: .6 },
        hidden: { opacity: 0 },
        exit: {
          opacity: 0,
          transition: { duration: .3 }
        }
      }}
      exit="exit"
      transition={{ delay: 2, duration: .3 }}
      position="absolute"
      zIndex={99}
      bottom="1rem"
      display="flex"
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
    </MotionBox>
  )
}

export default memo(ScrollDown)
