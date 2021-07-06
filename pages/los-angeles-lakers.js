import React, { memo } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Showcase = dynamic(() => import('./_showcase'), {
  ssr: false
})

const Page = () => {
  return (
    <>
      <Head>
        <title>Los Angeles Lakers — The Journey of LeBron James</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Showcase
        date="2018 / 2021"
        team="Los Angeles <br/> Lakers"
        hash="#los-angeles-lakers"
        medias={[
          {
            cover: '/images/youtube/lebron-james-2018-2019-season.jpg'
          }
        ]}
      />
    </>
  )
}

export default memo(Page)
