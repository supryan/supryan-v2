import React, { useState, createContext } from 'react'

export const ScrollSpyContext = createContext()

export default function ScrollSpyContextProvider({ children }) {
  const [activeItem, setActiveItem] = useState(null)

  const contextProps = {
    activeItem,
    setActiveItem,
  }

  return (
    <ScrollSpyContext.Provider value={contextProps}>
      {children}
    </ScrollSpyContext.Provider>
  )
}
