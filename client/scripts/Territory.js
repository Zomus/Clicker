//*IMPORTS*
import {drawCircle} from './controllers/DrawController.js'

//*IMPORTS*

//*CLASS CONSTANTS*



//**
//ENCLOSURE
(function() {
  function Territory(x, y, radius, shrinkRate, color){

    //Assign Default Properties
    x = x || 0;
    y = y || 0;
    radius = radius || 0;
    shrinkRate = shrinkRate || 0;
    color = color || 0;

    return {
      x: x,
      y: y,
      radius: radius,
      shrinkRate: shrinkRate,
      color: color,

      eFrame: function(){
        radius -= shrinkRate;
        //shrink the Territory

        if(radius > 0){
          return true;
        }else{
          return false;
          //delete the territory if its radius is less than 0
        }
      },

      draw: function(ctx){
        drawCircle(ctx, x, y, radius, color);
        //draws at its position based on its rotation
      }

    }
  }

  window.Territory = function(x, y, radius, shrinkRate, color){
    var territory = Territory(x, y, radius, shrinkRate, color);

    return territory;
  }

//ENCLOSURE
}());
