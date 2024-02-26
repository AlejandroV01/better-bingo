'use client'
import React, { SetStateAction, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')
const colors = [
  { text: 'red', color: 'bg-[#FF4F4F]/90', hover: 'hover:bg-[#FF4F4F]/75', selected: 'bg-[#FF4F4F]/90' },
  { text: 'blue', color: 'bg-[#4FA6FF]/90', hover: 'hover:bg-[#4FA6FF]/75', selected: 'bg-[#4FA6FF]/90' },
  { text: 'green', color: 'bg-[#67DE6A]/90', hover: 'hover:bg-[#67DE6A]/75', selected: 'bg-[#67DE6A]/90' },
  { text: 'orange', color: 'bg-[#FFA937]/90', hover: 'hover:bg-[#FFA937]/75', selected: 'bg-[#FFA937]/90' },
  { text: 'pink', color: 'bg-[#F97AFF]/90', hover: 'hover:bg-[#F97AFF]/75', selected: 'bg-[#F97AFF]/90' },
  { text: 'purple', color: 'bg-[#9177FF]/90', hover: 'hover:bg-[#9177FF]/75', selected: 'bg-[#9177FF]/90' },
]
interface ItemObject {
  text: string
  user: string | null
  color: string | null
}
const Bingo = () => {
  const items = [
    'healthy',
    'skin',
    '2 Mythological Creatures',
    '2 celebrities',
    'straw',
    'mechanical',
    'cry',
    'transport',
    'adventure',
    'subway',
    '3 animals',
    'poem',
    'double',
    'appendix',
    'absent',
    'depressed',
    'plane',
    'profile',
    'lemon',
    'inquiry',
    '2 countries',
    'scream',
    'a movie',
    'jet',
    'dry',
  ]

  const [itemObjects, setItemObjects] = useState<ItemObject[]>(() => {
    return items.map(item => ({
      text: item,
      user: null,
      color: null,
    }))
  })
  type IBingoSquare = { selectedColor: string; text: string; user: string }
  const [selectedColor, setSelectedColor] = useState<string>('red')
  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }
  const handleCellClick = (text: string) => {
    const user = 'ale'
    let preEmitted = false

    setItemObjects(prev => {
      return prev.map(item => {
        if (item.text === text) {
          if (item.color === selectedColor) {
            console.log('same color clicked')
            socket.emit('cell-click', { selectedColor: null, text, user: null })
            preEmitted = true
            return { ...item, user: null, color: null }
          } else {
            return {
              ...item,
              user,
              color: selectedColor,
            }
          }
        }
        return item
      })
    })
    if (!preEmitted) socket.emit('cell-click', { selectedColor, text, user })
  }
  useEffect(() => {
    socket.on('cell-click', ({ selectedColor, text, user }: IBingoSquare) => {
      console.log(selectedColor, text, user, 'useEffect cell-click')
      setItemObjects(prev => {
        return prev.map(item => {
          if (item.text === text) {
            return {
              text,
              user,
              color: selectedColor,
            }
          }
          return item
        })
      })
    })
  }, [])
  console.log(itemObjects)
  return (
    <div className='w-full sm:w-[625px] flex flex-col items-center container'>
      <h1 className='text-center text-3xl font-bold'>Bingo</h1>
      <div className='w-full bg-secondary rounded-lg p-2 my-5 flex flex-col gap-1'>
        <h3 className='text-center font-bold text-lg'>Color Picker</h3>
        <div className='grid grid-cols-2 gap-1 bg-secondary w-full flex-wrap md:grid-cols-6'>
          {colors.map(color => {
            return (
              <span
                key={color.text}
                className={`${color.color} py-1 rounded-lg font-bold cursor-pointer border-2 flex-1 w-full text-center ${
                  color.text === selectedColor ? 'border-foreground' : 'border-transparent'
                }`}
                onClick={() => handleColorSelect(color.text)}
              >
                {color.text}
              </span>
            )
          })}
        </div>
      </div>
      <div className='grid grid-cols-5 gap-1'>
        {itemObjects.map((item, index) => {
          return <BingoCell key={index} item={item} selectedColor={selectedColor} handleCellClick={handleCellClick} />
        })}
      </div>
    </div>
  )
}

export default Bingo

const BingoCell = ({
  item,
  selectedColor,
  handleCellClick,
}: {
  item: ItemObject
  selectedColor: string
  handleCellClick: (text: string) => void
}) => {
  const handleClick = () => {
    handleCellClick(item.text)
  }
  const renderColor = (scenario: string) => {
    const neededColor = colors.find(color => color.text === item.color)
    if (scenario === 'hover') return neededColor?.hover
    return neededColor?.selected
  }
  return (
    <div
      className={`w-full p-1 aspect-[5/6]  sm:aspect-square overflow-hidden  flex items-center justify-center text-center rounded-[0.5rem] transition-colors duration-75 ${
        item.color !== null ? renderColor('hover') : 'hover:bg-foreground/15'
      } ${item.color !== null ? renderColor('bg') : 'bg-foreground/10'} cursor-pointer`}
      onClick={handleClick}
    >
      <span className='font-bold text-sm md:text-base'>{item.text}</span>
    </div>
  )
}
