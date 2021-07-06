import React from 'react'
import {
  AspectRatio,
  Box,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import SimplePlane from '../SimplePlane'
import { Curtains, useCurtains } from 'react-curtains'

const VideoThumb = ({ thumbnail }) => {
  return (
    <Box>
      <AspectRatio maxW="80rem" ratio={16/9} backgroundColor="#000">
        <Image src={thumbnail} layout="fill" />
      </AspectRatio>
      {/* <Text as="span" fontSize="3rem" fontWeight="700" fontStyle="italic" mr={4}>the journey of</Text> */}
    </Box>
  )
}

export default VideoThumb
