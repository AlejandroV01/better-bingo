'use client'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Button } from './ui/button'
import { Input } from './ui/input'
const socket = io('http://localhost:3001')
const colors = [
  { text: 'red', color: 'bg-[#FF4F4F]/80', hover: 'group-hover:bg-[#FF4F4F]/90', selected: 'bg-[#FF4F4F]/80' },
  { text: 'blue', color: 'bg-[#4FA6FF]/80', hover: 'group-hover:bg-[#4FA6FF]/90', selected: 'bg-[#4FA6FF]/80' },
  { text: 'green', color: 'bg-[#67DE6A]/80', hover: 'group-hover:bg-[#67DE6A]/90', selected: 'bg-[#67DE6A]/80' },
  { text: 'orange', color: 'bg-[#FFA937]/80', hover: 'group-hover:bg-[#FFA937]/90', selected: 'bg-[#FFA937]/80' },
  { text: 'pink', color: 'bg-[#F97AFF]/80', hover: 'group-hover:bg-[#F97AFF]/90', selected: 'bg-[#F97AFF]/80' },
  { text: 'purple', color: 'bg-[#9177FF]/80', hover: 'group-hover:bg-[#9177FF]/90 ', selected: 'bg-[#9177FF]/80' },
]
interface ItemObject {
  text: string
  user: string[]
  selectedColors: string[]
}
const Bingo = () => {
  const [items, setItems] = useState<string[]>([
    '2 Movies',
    '3 Fictional Animals',
    '2 Mythological Creatures',
    'Goldfish',
    'Minecraft',
    'Any Pokemon',
    'Internet',
    'Refrigerator',
    'Piano',
    'Penny',
    'Spongebob',
    'Depressed',
    'Cuba',
    'Puerto Rico',
    'Jew',
    'Pink',
    'Monopoly',
    'Keyboard',
    'Lipstick',
    'Wisdom Teeth',
    'Shot Glass',
    'Alcohol',
    'Tarzan',
    'Corn',
    'Dog',
  ])
  const [itemsPrev, setItemsPrev] = useState<string[]>(() => {
    return items.map(item => item)
  })
  const [editCells, setEditCells] = useState<boolean>(false)
  const [itemObjects, setItemObjects] = useState<ItemObject[]>(() => {
    return items.map(item => ({
      text: item,
      user: [],
      selectedColors: [],
    }))
  })
  const [itemObjectsPrev, setItemObjectsPrev] = useState<ItemObject[]>(() => {
    return items.map(item => ({
      text: item,
      user: [],
      selectedColors: [],
    }))
  })
  const [selectedColor, setSelectedColor] = useState<string>('red')
  const areArraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) {
      return false
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }

    return true
  }
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
    socket.on('cell-edit', (allItems: ItemObject[]) => {
      console.log(allItems, 'useEffect cell-click')
      setItemObjects(allItems)
    })
  }, [])
  const handleDoneEditClick = () => {
    setEditCells(false)
    if (!areArraysEqual(items, itemsPrev)) {
      console.log('calling websocket for done edit')
      socket.emit('cell-edit', itemObjects)
      setItemObjectsPrev(itemObjects)
      setItemsPrev(items)
    } else {
      console.log('same cells done edit')
    }
  }
  const editInputOnChange = (newText: string, original: string) => {
    setItems(prev => prev.map(item => (item === original ? newText : item)))
    setItemObjects(prev => {
      return prev.map(item => {
        if (item.text === original) {
          return { ...item, text: newText }
        }
        return item
      })
    })
  }
  return (
    <div className='w-full sm:w-[625px] flex flex-col items-center container gap-5'>
      <h1 className='text-center text-3xl font-bold'>Bingo</h1>
      <div className='w-full bg-secondary rounded-lg p-2  flex flex-col gap-1'>
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
          return (
            <BingoCell
              key={index}
              item={item}
              selectedColor={selectedColor}
              handleCellClick={handleCellClick}
              editCells={editCells}
              editInputOnChange={editInputOnChange}
            />
          )
        })}
      </div>
      {editCells ? (
        <Button onClick={handleDoneEditClick} variant={'secondary'} className='bg-green-600 hover:bg-green-500'>
          Done
        </Button>
      ) : (
        <Button onClick={() => setEditCells(true)}>Edit Cells</Button>
      )}
    </div>
  )
}

export default Bingo

const BingoCell = ({
  item,
  selectedColor,
  handleCellClick,
  editCells,
  editInputOnChange,
}: {
  item: ItemObject
  selectedColor: string
  handleCellClick: (text: string) => void
  editCells: boolean
  editInputOnChange: (newText: string, original: string) => void
}) => {
  const handleClick = () => {
    if (editCells) return
    handleCellClick(item.text)
  }
  const renderCols = () => {
    const size = item.selectedColors.length
    return `col-span-${size}`
  }
  return (
    <div
      className={`group w-full p-1 aspect-[5/6] relative sm:aspect-square overflow-hidden  flex items-center justify-center text-center rounded-[0.5rem] transition-colors duration-75 hover:bg-foreground/15
      bg-foreground/10 cursor-pointer`}
      onClick={handleClick}
    >
      {!editCells ? (
        <span className=' font-bold text-sm md:text-base z-10'>{item.text}</span>
      ) : (
        <Input
          placeholder={item.text}
          onChange={e => {
            editInputOnChange(e.target.value, item.text)
          }}
          className='z-10'
        />
      )}

      {item.selectedColors && item.selectedColors.length > 0 && (
        <div className={` absolute top-0 left-0 w-full h-full grid ${renderCols()} `}>
          {item.selectedColors.sort().map((color, index) => {
            return (
              <div
                key={index}
                className={`${!editCells && colors.find(c => c.text === color)?.selected} ${!editCells && colors.find(c => c.text === color)?.hover}`}
              ></div>
            )
          })}
        </div>
      )}
    </div>
  )
}
