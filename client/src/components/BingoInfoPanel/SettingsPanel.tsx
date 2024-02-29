import React from 'react'
import { Card, CardHeader } from '../ui/card'
const SettingsPanel = ({ className }: { className?: string }) => {
  return (
    <Card className={`${className}`}>
      <CardHeader>SettingsPanel</CardHeader>
    </Card>
  )
}

export default SettingsPanel
