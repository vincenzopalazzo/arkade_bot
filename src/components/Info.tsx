import { ReactNode, useState } from 'react'
import Modal from './Modal'

export default function Info({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      {children}
    </Modal>
  )
}
