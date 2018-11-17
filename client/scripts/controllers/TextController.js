import {setFillStyle} from "./DrawController.js";

/**
 * Writes text on the screen.
 *
 * Example: Write "Hello World!" in green on top left corner with 10px Zapfino font.
 *
 * drawText(canvas, "Hello World!", 0, 0, 0x00ff00, 10, "Zapfino");
 *
 * @param {Canvas} ctx        HTML5 canvas where all items are drawn
 * @param {String} text       Text that that appears
 * @param {Number} x          Horizontal position of top left corner of text
 * @param {Number} y          Vertical position of top left corner of text
 * @param {Number} color      Color of text
 * @param {Number} fontSize   Dashed line properties
 * @param {String} fontFamily Font of text that appears
 * @returns undefined
 */

export function drawText(ctx, text, x, y, color, fontSize = 10, fontFamily = 'Calibri'){
  ctx.save();
  //save canvas context

  ctx.fillStyle = setFillStyle(ctx, color);

  ctx.font = String(fontSize) + "px " + fontFamily;
  ctx.fillText(text, x, y)

  ctx.restore();
  //restore canvas context
}
