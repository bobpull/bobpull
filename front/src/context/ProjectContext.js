import React, {createContext, useReducer} from "react"

const ProjectContext = createContext(null)

const ProjectReducer = (state, action) => {
  switch(action.type){
    case 'update-project':
      return [...action.payload]
    case 'add-project':
      return [...state, action.payload]
    case 'delete-project':
      return state.filter((project) => project.id !== action.payload)
    case 'put-project': {
      const id = action.payload.id
      const index = state.findIndex(x => x.id === id)
      state[index] = action.payload
      return [...state]
    }
      
    default:
      return state
  }

}

const ProjectProvider = ({children}) => {
  const [projects, dispatch] = useReducer(ProjectReducer,[])
  const store = {
    projects,
    dispatch,
  }
  return <ProjectContext.Provider value={store}>{children}</ProjectContext.Provider>
}

export {ProjectProvider, ProjectContext}
