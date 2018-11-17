
function checkPixelColor(x = 1, y = 1) {
//get the canvasPixelArray from the coordinates
  var imgd = context.getImageData(x,y,1,1);//x and y are the coordinates you want to check
  var pix = imgd.data;

  return pix;
}
