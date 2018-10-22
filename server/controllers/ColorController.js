/**
 * Returns a formatted fillStyle String for the canvas.
 *
 * Example: Turn the fillStyle of canvas to red
 *
 * canvas.fillStyle = hexToFillStyle(0xff0000);
 *
 *
 * @param {Number} hex Hexadecimal representation of color
 * @returns String that represents the formatted fillStyle String for the canvas.
 * @type String
 */

export function hexToFillStyle(hex){
  var red = (hex & 0xff0000) >> 16;
  var green = (hex & 0xff00) >> 8;
  var blue = (hex & 0xff);

  return 'rgb(' + red + ',' + green + ',' + blue + ')';
}
