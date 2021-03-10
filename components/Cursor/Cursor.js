import React from 'react'
import styled from '@emotion/styled'
import { animated } from 'react-spring'
import { Text } from '@chakra-ui/react'
import { useCursorState, CARD_TYPE } from '../../contexts/Cursor'

const trans = (x, y) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`

const CursorEl = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  border: 4px solid #fff;
  border-radius: 50%;
  background: transparent;
  pointer-events: none;

  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`
const AnimatedCursor = animated(CursorEl)

const Cursor = ({ xy, opacity }) => {
  const { color, type } = useCursorState()

  const getStyleForType = (type) => {
    switch(type) {
      case CARD_TYPE:
        return {
          width: '2.8rem',
          height: '2.8rem',
          backgroundColor: color,
        }
    }
  }

  return (
    <AnimatedCursor
      style={{
        transform: xy && xy.interpolate(trans),
        transition: 'width .3s ease, height .3s ease, background-color .3s ease, opacity .3s ease',
        opacity,
        borderColor: color,
        ...getStyleForType(type)
      }}
    >
      <Text pb="1rem" textAlign="center" fontSize="1.8rem" fontWeight="700" fontStyle="italic" lineHeight="1">explore <br/> this journey</Text>
    </AnimatedCursor>
  )
}

export default Cursor
