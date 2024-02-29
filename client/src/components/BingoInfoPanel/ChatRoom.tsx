import React from 'react'
import { Card, CardHeader } from '../ui/card'
const ChatRoom = ({ className }: { className?: string }) => {
  return (
    <Card className={`${className}`}>
      <CardHeader>ChatRoom</CardHeader>
    </Card>
  )
}

export default ChatRoom
