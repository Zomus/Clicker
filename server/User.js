module.exports = {
  init: function(guid, name, socket, color){
    return User(guid, name, socket, color);
  }
}

function User(guid, name, socket, color, score){

  //Assign Default Properties
  guid = guid || -1;
  name = name || "person" + guid
  socket = socket || null;
  color = color || null;
  score = score || 0;

  if(guid <= 0 || name == null || socket == null || color == null){
    console.warn("@User: Instantiation error.");
  }

  return {
    changeScore: function(change){
      score += change;
      if(score < 0){
        score = 0;
      }
    },
    getScore: function(){
      return score;
    },

    guid: guid,
    name: name,
    socket: socket,
    color: color
  }
}
