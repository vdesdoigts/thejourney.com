import React, { useEffect, memo } from 'react'
import { useTrail, a } from 'react-spring'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useAnimation } from 'framer-motion'
import MotionBox from '../MotionBox'

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

const Headline = ({ open, currentText }) => {
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
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -50 },
        exit: {
          opacity: 0,
          y: -50,
          transition: { duration: .6 }
        }
      }}
      exit="exit"
      transition={{ delay: 1, duration: .6 }}
      position="relative"
      zIndex={2}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pr="20rem"
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
    </MotionBox>
  )
}

export default memo(Headline)
