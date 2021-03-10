import React, { memo } from 'react'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'

const LinkOverlay = ({ href }) => (
  <Link href={href} passHref>
    <Box
      as="a"
      position="fixed"
      zIndex={99}
      width="100vw"
      height="100vh"
      cursor="pointer"
    />
  </Link>
)

export default memo(LinkOverlay)
