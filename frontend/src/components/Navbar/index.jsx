const Navbar = () => {
  return (
    <div className="w-full bg-white text-black p-2 flex items-center justify-between border-b-2 border-black">
      <div className="font-bold text-lg">🧠 77</div>
      <div className="text-xl font-semibold">Round 2 of 3</div>
      <div className="text-sm uppercase font-bold tracking-wide">Guess This <span className="ml-2">_ _ _ _ _</span></div>
      <div className="flex space-x-2">
        <button>👍</button>
        <button>👎</button>
        <button>⚙️</button>
      </div>
    </div>
  );
};

export default Navbar;
