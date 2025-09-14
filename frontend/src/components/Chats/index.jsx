import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const messages = [
  {  text: "guessed the word!", },
];

const ChatBox = () => {
  
  const [Data, setData] = useState(messages);
  const [message, setMessage] = useState("");

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to socket server", socket.id);
//     });
//   socket.on("message", (data) => {
//       setData((prev)=> [...prev, {text:data}])
      
//     });
//     return () => {
//       socket.disconnect()
//     };
//   }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const message = e.target[0].value;  
    
  // const roomId = sessionStorage.getItem("roomId");
  //    socket.emit("message", { message, roomId });
    e.target[0].value = "";
  };

//  const joinRoomHandler = ()=>{
//   const roomId = sessionStorage.getItem("roomId");
//   if(roomId){
//       socket.emit("join-room", roomId);
//   }
//   console.log(roomId)
//  }

// joinRoomHandler()

  return (
    <div
      className="
        w-full sm:w-1/3 lg:w-1/5 
        bg-white text-black 
        p-2 border-t sm:border-t-0 sm:border-l-2 border-black 
        flex flex-col justify-between
        h-64 sm:h-auto
      "
    >
      {/* Messages container */}
      <div className="overflow-y-auto flex-1 mb-2 flex flex-col">
        { Data &&  Data?.map((msg, idx) => (
          <div
           key={idx}  
          >
            <strong> </strong> {msg?.text}
          </div>
        ))}
      </div>

      {/* Input form */}
      <form className="flex gap-2" onSubmit={submitHandler}>
        <input
         onChange={(e)=> setMessage(e.target.value)}
        type="text"
          placeholder="Type your guess here..."
          className="flex-1 border border-gray-300 px-2 py-1 text-sm rounded"
        />
        <button
          type="submit"
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
