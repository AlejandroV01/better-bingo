'use client'
import React, { SetStateAction, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('https://better-bingo.onrender.com/')
const colors = [
  { text: 'red', color: 'bg-[#FF4F4F]/80', hover: 'group-hover:bg-[#FF4F4F]/90', selected: 'bg-[#FF4F4F]/80' },
  { text: 'blue', color: 'bg-[#4FA6FF]/80', hover: 'group-hover:bg-[#4FA6FF]/90', selected: 'bg-[#4FA6FF]/80' },
  { text: 'green', color: 'bg-[#67DE6A]/80', hover: 'group-hover:bg-[#67DE6A]/90', selected: 'bg-[#67DE6A]/80' },
  { text: 'orange', color: 'bg-[#FFA937]/80', hover: 'group-hover:bg-[#FFA937]/90', selected: 'bg-[#FFA937]/80' },
  { text: 'pink', color: 'bg-[#F97AFF]/80', hover: 'group-hover:bg-[#F97AFF]/90', selected: 'bg-[#F97AFF]/80' },
  { text: 'purple', color: 'bg-[#9177FF]/80', hover: 'group-hover:bg-[#9177FF]/90', selected: 'bg-[#9177FF]/80' },
]
interface ItemObject {
  text: string
  user: string[]
  selectedColors: string[]
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
      user: [],
      selectedColors: [],
    }))
  })
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
          if (item.selectedColors && item.selectedColors.includes(selectedColor)) {
            console.log('same color clicked')
            const newSelectedColors = item.selectedColors.filter(color => color !== selectedColor)
            socket.emit('cell-click', { selectedColors: newSelectedColors, text, user: [] })
            preEmitted = true
            return { ...item, user: [], selectedColors: newSelectedColors }
          } else {
            const newSelectedColors = item.selectedColors.concat(selectedColor)
            socket.emit('cell-click', { selectedColors: newSelectedColors, text, user })
            return {
              ...item,
              user: item.user.concat(user),
              selectedColors: item.selectedColors.concat(selectedColor),
            }
          }
        }
        return item
      })
    })
  }
  useEffect(() => {
    socket.on('cell-click', ({ selectedColors, text, user }: ItemObject) => {
      console.log(selectedColors, text, user, 'useEffect cell-click')
      setItemObjects(prev => {
        return prev.map(item => {
          if (item.text === text) {
            return {
              text,
              user,
              selectedColors,
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
    let neededColors: object[] = []
    colors.map(color => {
      if (item.selectedColors.includes(color.text)) {
        neededColors.push(color)
      }
    })
    console.log(neededColors)
    // if (scenario === 'hover') return neededColor?.hover
    // return neededColor?.selected
  }
  const renderCols = () => {
    const size = item.selectedColors.length
    return `col-span-${size}`
  }
  console.log(item)
  return (
    <div
      className={`w-full p-1 aspect-[5/6] relative sm:aspect-square overflow-hidden  flex items-center justify-center text-center rounded-[0.5rem] transition-colors duration-75 ${
        item.selectedColors && item.selectedColors.length > 0 ? renderColor('hover') : 'hover:bg-foreground/15'
      } ${item.selectedColors && item.selectedColors.length > 0 ? renderColor('bg') : 'bg-foreground/10'} cursor-pointer`}
      onClick={handleClick}
    >
      <span className='font-bold text-sm md:text-base z-10'>{item.text}</span>
      {item.selectedColors && item.selectedColors.length > 0 && (
        <div className={`group absolute top-0 left-0 w-full h-full grid ${renderCols()}`}>
          {item.selectedColors.sort().map((color, index) => {
            return <div key={index} className={`${colors.find(c => c.text === color)?.selected} ${colors.find(c => c.text === color)?.hover}`}></div>
          })}
        </div>
      )}
    </div>
  )
}
