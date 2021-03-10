import React from 'react'
import {
  AspectRatio,
  Box,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'

const VideoThumb = () => {
  return (
    <Box>
      <AspectRatio maxW="80rem" ratio={16/9} backgroundColor="#000">
        <Image src="/images/youtube/lebron-james-2018-2019-season.jpg" layout="fill" />
      </AspectRatio>
      {/* <Text as="span" fontSize="3rem" fontWeight="700" fontStyle="italic" mr={4}>the journey of</Text> */}
    </Box>
  )
}

export default VideoThumb
