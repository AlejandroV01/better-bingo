import React from 'react'
import { Card, CardHeader } from '../ui/card'
const PlayerPanel = ({ className }: { className?: string }) => {
  return (
    <Card className={`${className}`}>
      <CardHeader>PlayerPanel</CardHeader>
    </Card>
  )
}

export default PlayerPanel
