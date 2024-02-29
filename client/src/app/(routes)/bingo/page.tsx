import Bingo from '@/components/Bingo'
import BingoInfoPanel from '@/components/BingoInfoPanel/BingoInfoPanel'
import Stopwatch from '@/components/Stopwatch'
import React from 'react'
const BingoPage = () => {
  return (
    <div className='container flex flex-col lg:flex-row items-center lg:items-start gap-2'>
      <Bingo />
      <BingoInfoPanel />
    </div>
  )
}

export default BingoPage
