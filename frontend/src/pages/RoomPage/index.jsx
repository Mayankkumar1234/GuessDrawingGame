import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { IoCopy } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { InfoContext } from "../../Context/UserContext";

const CreateRoom = ({ clickFun, InpBtn}) => {


    
  const navigate = useNavigate(); 
   const {connectSocket } = useContext(InfoContext)

 


  const [showInput, setShowInput] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [copied, setCopied] = useState(false);  

    const generateRoom = ()=>{
   let id =  uuidv4();
   setRoomId(id)
  }

  const handleCreateRoomClick = () => {
 navigate(`/play/${roomId}`)
    localStorage.setItem("roomId", roomId)
    localStorage.setItem("role", "admin")
    console.log(roomId)
    connectSocket()
  };

  const handleJoinRoom = () => {
    
    if(roomId.trim() == ""){
      alert("Enter a valid room id"); 
   
  }else{
    localStorage.setItem("roomId", roomId)
    alert(`Joining room: ${roomId}`);
     connectSocket() 
    navigate(`/play/${roomId}`);

  }
}

  const handleCopy = () => {
   
    navigator.clipboard.writeText(roomId);

    setCopied(true); // show "Copied!"
    setTimeout(() => setCopied(false), 2000); // hide after 5 sec
  };


  useEffect(()=>{
   generateRoom();
   
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white p-4">
      <div className="bg-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-center pl-12">Skribbl Room</h1>
          <span onClick={clickFun} className="cursor-pointer">X</span>
        </div>

        {!showInput && InpBtn ? (
          <>
            <div className="w-full flex items-center justify-between relative">
              <input
                className="text-center text-blue-200   px-2 py-1 rounded outline-none"
                type="text"
                value={roomId}
          
                readOnly
              />
              <button className="bg-blue-400 py-1 px-1 rounded  mr-16" onClick={generateRoom} >Generate</button>
              {/* Copy Icon */}
              <p onClick={handleCopy} className="cursor-pointer">
                <IoCopy className="text-blue-400 text-xl" />
              </p>

              {/* ✅ Small "Copied!" text */}
              {copied && (
                <span className="absolute right-0 top-[-20px] text-green-400 text-sm">
                  Copied!
                </span>
              )}
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleCreateRoomClick}
            >
              Enter
            </button>
          </>
        ) : (
          <div className="space-y-4">
             
            <input className="text-center" type="text" placeholder="Enter room id" onChange={(e)=> setRoomId(e.target.value)}  />

            <button
              onClick={handleJoinRoom}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Join Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
