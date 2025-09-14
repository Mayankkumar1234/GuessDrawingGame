import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import {io}  from "socket.io-client"
import reducerAction from './reducerAction'

const initialState = {
userId:localStorage.getItem("userId") || null,
roomId:localStorage.getItem("roomId") || null,
users:localStorage.getItem("userName") || null ,
role:null,

}

export const InfoContext = createContext(initialState)

const UserContext = ({children}) => {

  const socket = useMemo(()=> io("http://localhost:9000", { autoConnect: false }), [])

  const [state , dispatch] = useReducer(reducerAction , initialState);
 

  useEffect(()=>{

   socket.on("connect", ()=>{
   localStorage.setItem("userId", socket.id);
   console.log(socket.id)
   })

    return ()=>{
      socket.disconnect()
    }
  }
  ,[socket])

  const connectSocket = ()=>{
    socket.connect()
  }

  return (
   <InfoContext.Provider value={{
    userName:state.userName,
    connection:state.connected,
    users:state.users,
     dispatch,
     socket,
     connectSocket
     }
   } >
    {
      children
    }
   </InfoContext.Provider>
  )
}

export default UserContext
