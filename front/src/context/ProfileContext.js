import React, {createContext, useReducer} from "react"

const ProfileContext = createContext(null)

const ProfileReducer = (state, action) => {
  switch(action.type){
    case 'update-project':
      return [...state, ...action.payload]
    case 'delete-project':
      return state.filter((project) => project.id !== action.payload)
    default:
      return state
  }
}

const ProfileProvider = ({children}) => {
  const [profiles, dispatch] = useReducer(ProfileReducer,[])
  const store = {
    profiles,
    dispatch,
  }
  return <ProfileContext.Provider value={store}>{children}</ProfileContext.Provider>
}

export {ProfileProvider, ProfileContext}