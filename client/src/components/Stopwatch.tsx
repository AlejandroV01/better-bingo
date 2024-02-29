import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
const Stopwatch = () => {
  return (
    <Card className='h-fit bg-accent'>
      <CardHeader className='font-bold text-xl'>StopWatch</CardHeader>
      <CardContent>
        <h1>0ms</h1>
      </CardContent>
    </Card>
  )
}

export default Stopwatch
