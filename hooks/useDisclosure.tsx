import { useState } from "react"
import { PossiblyUndefined } from "../types"

export const useDisclosure = (initValue: PossiblyUndefined<boolean> = false) => {
    const [isOpen, setIsOpen] = useState(initValue)

    const close = () => setIsOpen(false)
    const toggle = () => setIsOpen(prev => !prev)
    const open = () => setIsOpen(true)


    return { isOpen, close, toggle, open, setIsOpen }
}