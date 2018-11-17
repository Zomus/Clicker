module.exports = {
  checkPixelColor: checkPixelColor
}


function checkPixelColor(x, y) {//gets the RGBA values from a cordinate
  X = x;
  Y = y;
//get the canvasPixelArray from the coordinates
  var imgd = ctx.getImageData(X,Y,1,1);//x and y are the coordinates you want to check
  var pix = imgd.data;

  //console.log(pix)//log the color(debug)
}
