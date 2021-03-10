import React, { memo } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

const ShowcaseTitle = ({ date, team }) => (
  <Box pb="2rem">
    <Text fontSize="3rem" fontWeight="700" fontStyle="italic" lineHeight="1">{date}</Text>
    <Heading
      position="relative"
      fontSize="8rem"
      fontWeight="800"
      lineHeight=".75"
      textTransform="uppercase"
      letterSpacing={2}
      dangerouslySetInnerHTML={{ __html: team }}
    />
  </Box>
)

export default memo(ShowcaseTitle)
