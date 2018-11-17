module.exports = {
  init: function(id, socket){
    return User(id, socket, color);
  }
}

function User(id, socket, color){

  //Assign Default Properties
  id = id || -1;
  socket = socket || null;
  color = color || 0;

  if(id < 0 || socket == null || color == 0){
    console.warn("@User: Instantiation error.")
  }

  return {
    id: id,
    socket: socket,
    color: color
  }
}
