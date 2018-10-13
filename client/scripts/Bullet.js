//*IMPORTS*
import {CANVAS_WIDTH} from './Main.js';
import {CANVAS_HEIGHT} from './Main.js';

import {drawRotated} from './plugins/DrawController.js';
import {setFillStyle} from './plugins/DrawController.js';

//*IMPORTS*

//*CLASS CONSTANTS*

const SCALE = 0.5;
const SIZE = 5;
const COLOR = 0x00ff00;

const SPRITE = Sprite('bullet');
const OFFSET_X = 82;
const OFFSET_Y = 82;



//**
//ENCLOSURE
(function() {
  function Bullet(x, y, rotation, speed, parent){

    //Assign Default Properties
    x = x || 0;
    y = y || 0;
    rotation = rotation || 0;
    speed = speed || 1;
    parent = parent || null;

    return {
      x: x,
      y: y,
      speed: speed,

      eFrame: function(){
        x += speed * Math.cos(rotation);
        y += speed * Math.sin(rotation);
        //console.log("moving", x, y);

        if(x < 0 || x > CANVAS_WIDTH || y < 0 || y > CANVAS_HEIGHT){
          return false;
        }

        return true;
      },

      draw: function(ctx){
        drawRotated(ctx, x, y, rotation, Bullet.drawOrigin, ctx);
        //draws at its position based on its rotation
      }

    }
  }

  Bullet.drawOrigin = function (ctx){
    console.log("draw");

    //Temporary draw method
    setFillStyle(ctx, COLOR);
    ctx.beginPath();
    ctx.arc(-SIZE*0.5, -SIZE*0.5, SIZE, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  window.Bullet = function(x, y, rotation, speed, parent){
    var bullet = Bullet(x, y, rotation, speed, parent);

    document.addEventListener("ENTER_FRAME", function(e){
      bullet.eFrame();
    }, false)

    return bullet;
  }

//ENCLOSURE
}());
