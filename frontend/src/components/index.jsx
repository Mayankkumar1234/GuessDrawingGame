import Navbar from './Navbar/index';
import Users from './UserBar/index'; 
import ChatBox from './Chats/index';
import DrawingTools from "./DrawingTools/index"
import { useContext, useEffect } from 'react';
import { InfoContext } from '../Context/UserContext';

const index = () => {

  const {connectSocket, socket} =  useContext(InfoContext)

  useEffect(()=>{
    let name = localStorage.getItem("name");
    let role = localStorage.getItem("role");
    let roomId = localStorage.getItem("roomId");
    let userId = localStorage.getItem("userId")
    let data = {name , role , roomId , userId}
    
   connectSocket()
 const geteet =  socket.emit("user-joined",data)
    console.log(geteet)
 console.log("It is right place");
 socket.on("userIsJoined",(data)=>{
  console.log(data)
 })
   return ()=>{
    console.log("socket has disconnected..."); 
    socket.disconnect();
   }
  },[])

  return (
    <div className='flex justify-center items-center bg-blue-900 pt-4'>
       <div className="min-h-screen w-[90vw]  text-center bg-blue-900   bg-repeat relative text-white">
      <Navbar />
      <div className="flex gap-2">
        <Users /> 
        
 <DrawingTools  /> 
        <ChatBox />
      </div>
      
    </div>
    </div>
  )
}

export default index
