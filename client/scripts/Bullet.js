//*IMPORTS*
import {CANVAS_WIDTH} from './Main.js';
import {CANVAS_HEIGHT} from './Main.js';
import {currentMap} from './Main.js';

import {drawRotated} from './plugins/DrawController.js';
import {setFillStyle} from './plugins/DrawController.js';

//*IMPORTS*

//*CLASS CONSTANTS*

const SCALE = 0.5;
const SIZE = 5;
const COLOR = 0x00ff00;

//const SPRITE = Sprite('bullet');
const OFFSET_X = 82;
const OFFSET_Y = 82;



//**
//ENCLOSURE
(function() {
  function Bullet(x, y, speedX, speedY, reflections, parent){

    //Assign Default Properties
    x = x || 0;
    y = y || 0;
    speedX = speedX || 0;
    speedY = speedY || 0;
    reflections = reflections || 0;
    parent = parent || null;

    return {
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,

      eFrame: function(){
        if(currentMap.insideGround(x - SIZE*0.5 + speedX, y) || currentMap.insideGround(x + SIZE*0.5 + speedX, y)){
          if(reflections > 0){
            speedX = -speedX;
            reflections--;
          }else{
            return false;
          }
        }
        if(currentMap.insideGround(x, y - SIZE*0.5 + speedY) || currentMap.insideGround(x, y + SIZE*0.5 + speedY)){
          if(reflections > 0){
            speedY = -speedY;
            reflections--;
          }else{
            return false;
          }
        }

        x += speedX;
        y += speedY;



        if(x < 0 || x > CANVAS_WIDTH || y < 0 || y > CANVAS_HEIGHT){
          return false;
        }

        if(currentMap.insideGround(x, y)){
          //if inside the ground of the current map, destroy bullet

          return false;
        }

        return true;
      },

      draw: function(ctx){
        drawRotated(ctx, x, y, Math.atan2(speedY, speedX), Bullet.drawOrigin, ctx);
        //draws at its position based on its rotation
      }

    }
  }

  Bullet.drawOrigin = function (ctx){
    //Temporary draw method
    setFillStyle(ctx, COLOR);
    ctx.beginPath();
    ctx.arc(-SIZE*0.5, -SIZE*0.5, SIZE, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  window.Bullet = function(x, y, speedX, speedY, reflections, parent){
    var bullet = Bullet(x, y, speedX, speedY, reflections, parent);

    document.addEventListener("ENTER_FRAME", function(e){
      bullet.eFrame();
    }, false)

    return bullet;
  }

//ENCLOSURE
}());
