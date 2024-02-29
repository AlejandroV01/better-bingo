'use client'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { updateTime } from '@/state/stopwatch/stopwatch.slice'
import { AppDispatch, RootState } from '@/state/store'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
const Stopwatch = ({ className }: { className?: string }) => {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)
  // const dispatch = useAppDispatch()
  // const currentTime = useAppSelector((state: RootState) => state.stopwatch.stateTime)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime(time => time + 10)
      }, 10)
    } else {
      interval && clearInterval(interval)
    }
    return () => {
      interval && clearInterval(interval)
    }
  }, [isActive, isPaused])
  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsActive(false)
    setTime(0)
  }
  return (
    <Card className={`${className} h-fit bg-accent text-center`}>
      <CardHeader className='font-bold text-xl'>StopWatch</CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <div className='text-3xl'>
          <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
          <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className='flex gap-2 w-full justify-center'>
          {isActive ? (
            <div className='flex w-full justify-center gap-2'>
              <Button onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'}</Button>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <Button onClick={handleStart}>Start</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Stopwatch
