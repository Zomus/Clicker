module.exports = {
  checkPixelColor: checkPixelColor
}

/**
 * Checks the color of a single pixel of a canvas
 *
 * @param {Canvas} ctx          Canvas to search
 * @param {Number} x            Horizontal position of pixel on canvas to check
 * @param {Number} y            Vertical position of pixel on canvas to check
 * @returns {int}               Color found in pixel
 */

function checkPixelColor(ctx, x, y) {//gets the RGBA values from a cordinate
  //get the canvasPixelArray from the coordinates
  var imgd = ctx.getImageData(x, y, 1, 1);
  //x and y are the coordinates you want to check

  return imgd.data;
}
