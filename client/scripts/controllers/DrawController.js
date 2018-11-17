/**
 * Returns a formatted fillStyle String for the canvas.
 *
 * Example: Turn the fillStyle of canvas to red
 *
 * canvas.fillStyle = hexToFillStyle(0xff0000);
 *
 *
 * @param {Canvas} ctx HTML5 canvas where all items are drawn
 * @param {Object} drawItem Item to be drawn
 * @param {Number} drawFunction Function to draw the object without
 * @param {Number} rotation Hexadecimal representation of color
 * @param {Number} offsetX Horizontal offset of rotation point from center of rotated item
 * @param {Number} offsetY Vertical offset of rotation point from center of rotated item
 * @returns undefined
 */

export function drawRotated(ctx, x, y, rotation, drawFunction, ...drawParams){

  ctx.save();
  // <*> save origin and rotation of canvas prior to drawing

  ctx.translate(x, y);
  //translate the canvas to the center of objects

  ctx.rotate(rotation);
  //rotate the canvas

  drawFunction.apply(null, drawParams);
  //execute the draw function that draws the object at origin, in reverse

  ctx.restore();
  //restore canvas to previously saved state. REFER TO <*>
}

/**
 * Changes fill style (such that next time fill is drawn on canvas it matches the style set here).
 *
 * Example: Set fill style to green and draw a circle
 *
 * setFillStyle(ctx, 0x00ff00);
 * ctx.arc(50, 50, 100, 0, 2*Math.PI);
 * ctx.closePath();
 * ctx.fill();
 *
 * @param {CanvasContext} ctx HTML5 canvas where all items are drawn
 * @param {Number} color Function to draw the object without
 * @returns undefined
 */

export function setFillStyle(ctx, color = 0){
  ctx.beginPath();
  //begin drawing

  var colorString = ("000000" + color.toString(16)).substr(-6);

  ctx.fillStyle = "#" + ("000000" + color.toString(16)).substr(-6)
  //set stroke color
}



/**
 * Changes line style (such that next time line is drawn on canvas it matches the style set here).
 *
 * Example: Set line style to 5px green dashed line with [5, 15] dash, then draw a diagonal line.
 *
 * lineStyle(canvas, 0xff0000);
 * canvas.moveTo(0, 0);
 * canvas.lineTo(100, 100);
 * canvas.fill();
 *
 * @param {Canvas} ctx HTML5 canvas where all items are drawn
 * @param {Number} thickness Thickness of cursor line
 * @param {Number} color Function to draw the object without
 * @param {Array} dashProp Dashed line properties
 * @param {String} lineCap End cap style for line
 * @returns undefined
 */

export function setLineStyle(ctx, thickness = 1, color = 0, dashProp = [], lineCap = 'butt'){
  ctx.beginPath();
  //begin drawing

  ctx.lineWidth = String(thickness);
  //set line with

  var colorString = ("000000" + color.toString(16)).substr(-6);

  ctx.strokeStyle = "#" + ("000000" + color.toString(16)).substr(-6)
  //set stroke color

  ctx.lineCap = lineCap;

  ctx.setLineDash(dashProp);
  //set line dash style
}



/**
 * Draws a cross on the screen using given properties.
 *
 * @param {Canvas} ctx HTML5 canvas where all items are drawn
 * @param {Number} x Horizontal position of cursor
 * @param {Number} y Vertical position of cursor
 * @param {Number} size Size of cursor
 * @param {Number} thickness Thickness of cursor line
 * @param {Number} color Color of cursor
 * @param {Number} lineFraction How far the line extends towards the center (from corner)
 * @param {String} lineCap End cap style for line
 * @returns undefined
 */

export function drawCross(ctx, x, y, size = 25, thickness = 1, color = 0, lineFraction = 0.5, lineCap = 'butt'){
  ctx.save();
  //save canvas settings

  //Compute dash properties based on Size
  var diagonalLength = Math.sqrt(Math.pow(size, 2) * 2);
  var dashProp = [diagonalLength * lineFraction*0.5, diagonalLength * (1 - lineFraction)];

  setLineStyle(ctx, thickness, color, dashProp, lineCap);
  //set line style

  //Draw the cross
  ctx.moveTo(x - size*0.5, y - size*0.5);
  ctx.lineTo(x + size*0.5, y + size*0.5);
  ctx.moveTo(x + size*0.5, y - size*0.5);
  ctx.lineTo(x - size*0.5, y + size*0.5);
  ctx.stroke();

  ctx.restore();
  //restore canvas settings

}


/**
 * Draws a cross on the screen using given properties.
 *
 * @param {Canvas} ctx HTML5 canvas where all items are drawn
 * @param {Number} x Horizontal position of circle
 * @param {Number} y Vertical position of circle
 * @param {Number} radius Size of cursor
 * @param {Number} color Color of circle
 * @returns undefined
 */

export function drawCircle(ctx, x, y, radius, color = 0){
  ctx.save();
  //save canvas settings

  setFillStyle(ctx, color);

  ctx.arc(x, y, radius, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
  //restore canvas settings

}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
export function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}
