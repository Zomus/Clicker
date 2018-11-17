module.exports = {
  removeFromArray: removeFromArray
}

/**
 * Removes all instances of an object/value from an array
 *
 * @param {Array} arr         Array to search through
 * @param {Any} item          Item to be removed
 * @returns {int}             Number of items removed from array
 * @type String
 */

function removeFromArray(arr, item) {
  var count = 0;

  for(var i = 0; i < arr.length; i++){
    if(arr[i] === item){
      arr.splice(i);
      count++;
    }
  }

  return count;
}
