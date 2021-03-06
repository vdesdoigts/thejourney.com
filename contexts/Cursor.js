import React from 'react'
const CursorStateContext = React.createContext()
const CursorDispatchContext = React.createContext()

export const CARD_TYPE = 'card'
export const DEFAULT_TYPE = 'default'

function CursorProvider({children}) {
  const [state, dispatch] = React.useState({
    color: '#fff',
    type: DEFAULT_TYPE,
  })

  return (
    <CursorStateContext.Provider value={state}>
      <CursorDispatchContext.Provider value={dispatch}>
        {children}
      </CursorDispatchContext.Provider>
    </CursorStateContext.Provider>
  )
}

function useCursorState() {
  const context = React.useContext(CursorStateContext)
  if (context === undefined) {
    throw new Error('useCursorState must be used within a CursorProvider')
  }
  return context
}

function useCursorDispatch() {
  const context = React.useContext(CursorDispatchContext)
  if (context === undefined) {
    throw new Error('useCursorDispatch must be used within a CursorProvider')
  }
  return context
}

export {CursorProvider, useCursorState, useCursorDispatch}
