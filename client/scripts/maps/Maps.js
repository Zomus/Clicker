import {gameContainer} from '../Main.js';
import {mapContainer} from '../Main.js';

import '../Tile.js';

const x = 'X';
const SIZE = 100;

//Maps
const MAP_0 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, x, 0, 1, 0, 0, x, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
//degrees of rotation

const MAPS = [MAP_0];

export function setMap(mapNumber){
  var mapArray = MAPS[mapNumber];

  reloadTiles(mapArray);
  //add tiles to gameContainer

  return Map(mapArray);
}

function reloadTiles(mapArray){
  if(gameContainer.indexOf(mapContainer) >= 0){
    //if mapContainer exists inside gameContainer

    gameContainer.splice(indexOf(mapContainer), 1);
    //remove old mapContainer from the gameContainer
  }

  var newMapContainer = [];
  //tempoarary new mapContainer

  //Loop through map array to populate mapContainer with tiles
  for(var row = 0; row < mapArray.length; row++){
    for(var col = 0; col < mapArray[row].length; col++){
      if(mapArray[row][col] == 1){
        var tempTile = Tile(col*SIZE, row*SIZE, SIZE);
        newMapContainer.push(tempTile);
      }
    }
  }

  gameContainer.push(newMapContainer);
  //add the new mapContainer to the gameContainer
}


//ENCLOSURE
(function() {
  function Map(mapArray){

    //Assign Default Properties
    mapArray = mapArray || [];

    return {
      mapArray: [],

      insideGround: function(x, y){
        var col = Math.floor(x / SIZE);
        var row = Math.floor(y / SIZE);

        console.log(x, y, col, row);

        let currentBlock = mapArray[row][col];

        if(currentBlock != undefined && currentBlock == 1){
          return true;
        }
        else{
          return false;
        }
      }
    }
  }

  window.Map = function(mapArray){
    var map = Map(mapArray);

    return map;
  }

//ENCLOSURE
}());
