import { useContext, useEffect, useMemo } from "react"; 
import { InfoContext } from "../../Context/UserContext";
import { useState } from "react";

 

const Users = () => {

  const {socket} = useContext(InfoContext)
 
  const [players, setPlayers] = useState([]);
  useEffect(()=>{ 
    console.log("Uffect is not working")
     // When a new user joins
    const handleUserName = (data) => {
      setPlayers((prev) => [...prev, data]);
      console.log(data)
    };

    // When the list of users is updated
    const handleUpdatedNames = (data) => {
      setPlayers(data);
      console.log(data)
    };

    socket.on("userName", handleUserName);
    socket.on("updatedNames", handleUpdatedNames);

    // Cleanup listeners on unmount
    return () => {
      socket.off("userName", handleUserName);
      socket.off("updatedNames", handleUpdatedNames);
    };
  },[])

  return (
    <div className="w-1/5 bg-white text-black p-2 border-r-2 border-black  h-[25%] ">
      { players && players.map((player, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold">#{index + 1}</span>
          <div className="flex items-center space-x-2">
           
            <span className="text-sm">{player}</span> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
