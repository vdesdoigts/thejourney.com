import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Heading, Text, keyframes } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import MotionBox from '../components/MotionBox'
import ShowcaseTitle from '../components/ShowcaseTitle'
import VideoThumb from '../components/VideoThumb'

const arrowAnim = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(.4rem);
  }
  100% {
    transform: translateX(0);
  }
`

const Showcase = ({
  date,
  team,
  medias,
  hash,
}) => {
  const router = useRouter()

  return (
      <Box
        as="main"
        position="relative"
        minHeight="100vh"
        backgroundImage="url(/images/los-angeles-lakers-nb-crop.jpg)"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          zIndex={1}
          bottom={0}
          right={0}
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, .54)"
        />
        <MotionBox
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          position="relative"
          zIndex={2}
          display="flex"
          alignItems="flex-end"
          minHeight="100vh"
        >
          <Box width="100%" pb="4rem">
            <Box position="relative" pl="16rem">
              <ShowcaseTitle date="2018 / 2021" team="Los Angeles <br/> Lakers" />
            </Box>
            <Box width="100%">
              <Swiper
                spaceBetween={20}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                grabCursor
                freeMode
              >
                {medias?.map(({ cover }, index) => (
                  <SwiperSlide key={index}>
                    <VideoThumb thumbnail={cover} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box pt="2rem" pl="16rem">
              <Flex fontSize="1.4rem" onClick={() => router.push({ pathname: '/', hash })}>
                <Text animation={`${arrowAnim} 2s linear infinite`}>←</Text>
                <Text
                  as="span"
                  ml=".6rem"
                  fontSize="1.8rem"
                  fontStyle="italic"
                  fontWeight="700"
                  lineHeight="1"
                >
                  summary
                </Text>
              </Flex>
            </Box>
          </Box>
        </MotionBox>
      </Box>
  )
}

export default memo(Showcase)
