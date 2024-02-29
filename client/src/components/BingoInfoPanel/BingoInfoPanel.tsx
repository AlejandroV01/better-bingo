import React from 'react'
import ChatRoom from './ChatRoom'
import PlayerPanel from './PlayerPanel'
import SettingsPanel from './SettingsPanel'
import Stopwatch from './Stopwatch'
const BingoInfoPanel = () => {
  return (
    <div className='w-full lg:w-2/5 flex flex-col gap-2'>
      <Stopwatch />
      <div className='flex flex-col lg:grid grid-cols-3 grid-rows-4 h-full gap-2 w-full'>
        <ChatRoom className='col-span-2 row-span-4' />
        <PlayerPanel className='col-span-1 row-span-2' />
        <SettingsPanel className='col-span-1 row-span-2' />
      </div>
    </div>
  )
}

export default BingoInfoPanel
