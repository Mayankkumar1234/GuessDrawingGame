import React, { useRef, useState } from "react";
import { useEffect } from "react"; 
import { IoIosColorFill } from "react-icons/io";
import { FcUndo } from "react-icons/fc";  
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSquare, FaCircle, FaSlash } from "react-icons/fa"; // Import icons for shapes


const colors = [
  "#000000", "#808080", "#c0c0c0", "#ffff99",
  "#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80",
  "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff", "#ff0080",
  "#804000", "#c08040" 
   ];
let size =[2,4,8]
 

const DrawingToolbar = () => {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#00000");
   const [display , setDisplay] = useState(false)
   const [lineWidth, setLineWidth] = useState(3);
   const [isDrawing, setIsDrawing] = useState(false);
   const [isErasing, setIsErasing] = useState(false);
   const [selectTool , setSelectTool] = useState("pencil");
   const [isDragging, setIsDragging] = useState(false);
   

    useEffect(() => {
       const canvas = canvasRef.current;
       canvas.width = 800;
       canvas.height = 500;
       canvas.style.width = "800px";
       canvas.style.height = "500px";
   
       const context = canvas.getContext("2d");
      //  context.lineCap = "round";
       context.strokeStyle = selectedColor;
       context.lineWidth = lineWidth;
       contextRef.current = context; 
     }, []);

const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = contextRef.current;
    ctx.strokeStyle = isErasing ? "#ffffff" : selectedColor;
    ctx.lineWidth = lineWidth;

    setIsDrawing(true);
      ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    
     const { offsetX, offsetY } = nativeEvent; 
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
//   const handleFillCanvas = () => {
//   const canvas = canvasRef.current;
//   const ctx = contextRef.current;

//   ctx.fillStyle = selectedColor;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
// };

const handleMouseDown = (e) => {
  setIsDragging(true);
};

const handleMouseMove = (e) => {
  if (!isDragging) return;

  // const canvasRect = canvasRef.current.getBoundingClientRect();
  // const x = e.clientX - canvasRect.left;
  // const y = e.clientY - canvasRect.top;
  // setPaintPosition({ x, y });
};

const handleMouseUp = () => {
  setIsDragging(false);
};


  return (
  
    <div className="flex flex-col justify-center items-center"> 
       <div  className="w-3/5 bg-white border-black border-x-2 flex items-center 
      justify-center relative"
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}>
      <canvas   ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}    className="bg-white border-2 border-black cursor-crosshair">
        {/* Placeholder for drawing
      {/* 
     */}
       </canvas>
      {selectTool === "paint" && (
  <div
    onMouseDown={handleMouseDown}
    className="absolute cursor-move"
    // style={{
    //   top: `${paintPosition.y}px`,
    //   left: `${paintPosition.x}px`,
    // }}
  >
    <IoIosColorFill size={24} color="black" />
  </div>
)}

    </div> 

     <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
  {/* Parent container for toolbars */}
  <div className="flex flex-row items-center justify-center gap-6">
    
    {/* Shapes Toolbar */}
    <div className="flex items-center bg-gray-700 px-4 py-1 space-x-2 overflow-x-auto rounded-md shadow-md w-fit">
      <span className="text-white font-bold">Add Shape:</span>

      <div
        onClick={() => setSelectTool("rectangle")}
        className={`w-10 h-10 bg-white border-2 border-black rounded flex items-center justify-center cursor-pointer ${
          selectTool === "rectangle" ? "border-pink-500" : "border-black"
        }`}
        title="Rectangle"
      >
        <FaSquare />
      </div>

      <div
        onClick={() => setSelectTool("circle")}
        className={`w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer ${
          selectTool === "circle" ? "border-pink-500" : "border-black"
        }`}
        title="Circle"
      >
        <FaCircle />
      </div>

      <div
        onClick={() => setSelectTool("line")}
        className={`w-10 h-10 bg-white border-2 border-black rounded flex items-center justify-center cursor-pointer ${
          selectTool === "line" ? "border-pink-500" : "border-black"
        }`}
        title="Line"
      >
        <FaSlash />
      </div>
    </div>

    {/* Color & Tools Toolbar */}
    <div className="flex items-center bg-blue-800 px-2 space-x-2 overflow-x-auto rounded-md shadow-md w-fit">
      {/* Eraser */}
      <div
        className={`w-8 h-8 bg-white border-2 border-black rotate-45 ${
          selectTool === "eraser" ? "bg-pink-500" : "bg-white"
        }`}
        onClick={() => {
          setIsErasing(true);
          setSelectTool("eraser");
          setLineWidth(9);
        }}
      ></div>

      {/* Color Palette */}
      <div className="grid grid-rows-2 grid-cols-9 gap-1">
        {colors.map((color, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedColor(color);
              setLineWidth(3);
              setIsErasing(false);
            }}
            className={`w-5 h-8 cursor-pointer border ${
              selectedColor === color ? "border-yellow-300" : "border-gray-500"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Brush Dot */}
      <div className="w-8 h-8 bg-white border border-black flex items-center justify-center">
        <div
          onClick={() => setDisplay((prev) => !prev)}
          className="w-3 h-3 bg-black rounded-full cursor-pointer"
        ></div>
      </div>

      {/* Pencil Tool */}
      <div
        onClick={() => {
          setSelectTool("pencil");
          startDrawing();
        }}
        className={`w-8 h-8 ${
          selectTool === "pencil" ? "bg-pink-500" : "bg-white"
        } text-black font-bold flex items-center justify-center rounded cursor-pointer`}
      >
        <FaPencilAlt />
      </div>

      {/* Undo Tool */}
      <div className="w-8 h-8 bg-white text-black flex items-center justify-center border border-black rounded cursor-pointer">
        <FcUndo />
      </div>

      {/* Clear Tool */}
      <div
        className="w-8 h-8 bg-white text-black flex items-center justify-center border border-black rounded cursor-pointer"
        onClick={() => {
          const canvas = canvasRef.current;
          contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        }}
      >
        <MdDelete />
      </div>
    </div>
  </div>

  {/* Optional: Brush Size Selector */}
  {display && (
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20 bg-zinc-200 w-28 rounded-md h-[60px] flex gap-2 flex-col px-2 justify-center shadow-md">
      {size.map((ele) => (
        <span
          key={ele}
          onClick={() => {
            setLineWidth(ele);
            setDisplay((prev) => !prev);
          }}
          className="border border-black rounded cursor-pointer text-center p-1 bg-white hover:bg-gray-300"
        >
          {ele}px
        </span>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default DrawingToolbar;

 