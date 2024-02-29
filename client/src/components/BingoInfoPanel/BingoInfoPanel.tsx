import React from 'react'
import ChatRoom from './ChatRoom'
import PlayerPanel from './PlayerPanel'
import SettingsPanel from './SettingsPanel'
const BingoInfoPanel = () => {
  return (
    <div className='flex flex-col lg:grid grid-cols-3 grid-rows-4 h-full gap-2 w-2/5'>
      <ChatRoom className='col-span-2 row-span-4' />
      <PlayerPanel className='col-span-1 row-span-2' />
      <SettingsPanel className='col-span-1 row-span-2' />
    </div>
  )
}

export default BingoInfoPanel
