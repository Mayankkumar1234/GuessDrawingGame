import  { useState } from "react";
import RoomPage from "../RoomPage"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { InfoContext } from "../../Context/UserContext";

const App = () => {
  
//  const {socket} = useContext(InfoContext)

 const navigate = useNavigate();

  const [Display , setDisplay] = useState(false)
    const [InpBtn , setInpBtn] = useState(true)
    const [name , setName] = useState("")

  const handleClick = ()=>{
   let id = localStorage.getItem("userId")
    let user = {id , name}
    if(name.trim()){
      // socket.emit("addName", user)
    }
    setName("")
    setDisplay((prev)=> !prev)
  }
  
  return (
    <div className="min-h-screen bg-blue-800 text-white font-sans">
      {/* Background pattern layer */}
         {
          !Display  && 
          <>
             <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-20 z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-6">
        {/* Logo */}
        <h1 className="text-6xl font-bold">
          <span className="text-red-500">s</span>
          <span className="text-orange-500">k</span>
          <span className="text-yellow-500">r</span>
          <span className="text-green-500">i</span>
          <span className="text-blue-500">b</span>
          <span className="text-indigo-500">b</span>
          <span className="text-purple-500">l</span>
          <span className="text-pink-500">.</span>
          <span className="text-white">io</span>
        </h1>

        {/* Input Card */}
        <div className="bg-blue-900 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
          <input 
            onChange={(e)=> setName(e.target.value)}
            type="text"
            placeholder="Enter name"
            className="w-full p-2 rounded bg-blue-700 text-white placeholder-white"
          />

          <select className="w-full p-2 rounded bg-blue-700 text-white">
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>

          {/* Avatar Placeholder */}
          <div className="flex items-center justify-center space-x-4">
            <button className="text-xl">⬅️</button>
            <div className="bg-purple-500 w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold">
              😎
            </div>
            <button className="text-xl">➡️</button>
          </div>

          {/* Buttons */}
          {/* <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded" onClick={()=>{
            navigateUser();
          }}>
            Play!
          </button> */}
          <div className="flex gap-3">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded" onClick={()=> {
              if(name.trim()){
                localStorage.setItem("name", name)
                setDisplay(prev=> !prev)
              setInpBtn(false)
              }else{
                alert("Enter your name!")
              }
            }}     >
            Enter Private Room
          </button>
           <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded" onClick={()=> {  if(name.trim()){
            localStorage.setItem("name", name)
                setDisplay(prev=> !prev)
              setInpBtn(true)
              }else{
                alert("Enter your name!")
              }
           }} >
            Create Private Room
          </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-center mt-6 px-4">
          <p><strong>About:</strong> Skribbl.io is a free online multiplayer drawing and guessing pictionary game.</p>
        </div>
      </div>
          </>
         }
      {
        Display &&  <RoomPage InpBtn={InpBtn} clickFun={handleClick}   />
      }
    </div>
  );
};

export default App;
