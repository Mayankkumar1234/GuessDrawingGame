const users = [];

// Add a user in the list

const addUser = ({ name, userId, roomId, role }) => {
  const user = { name, userId, roomId, role };
  users.push(user);
  return users.filter((user) => user.roomId === roomId);
};

//  Logic to remove a user

const removeUser = (id) => {};

//  Get a user from the list
const getUser = (id) => {
  return users.find((user) => user.userId == id);
};

const getUsersInRoom = (room) => {
  // return user.find(user=>)
  const roomUsers = [];
  users.map((user) => {
    if (user.roomId == room) {
      roomUsers.push(user);
    }
  });
  return roomUsers;
};

module.exports = {
  addUser,
  removeUser,
  getUsersInRoom,
  getUser,
};
