//*IMPORTS*


import './Bullet.js';

import {canvas} from './Main.js';
import {ctx} from './Main.js';
import {mouseX} from './Main.js';
import {mouseY} from './Main.js';

import {bulletContainer} from './Main.js';

import {hexToFillStyle} from './plugins/ColorController.js';

import {drawRotated} from './plugins/DrawController.js';
import {setLineStyle} from './plugins/DrawController.js';
import {drawCross} from './plugins/DrawController.js';


//*IMPORTS*

//*CLASS CONSTANTS*

const SCALE = 0.5;

const ROTATE_SPEED = 15;
//degrees of rotation

const TURRET_LENGTH = 150*SCALE;
//length of bullet turret

const SPRITE = Sprite('tank-rotor');
const OFFSET_X = 82;
const OFFSET_Y = 82;



//**
//ENCLOSURE
(function() {
  function Tank(x, y, scale, rotation, color, speed){

    //Assign Default Properties
    x = x || 0;
    y = y || 0;
    scale = scale || 0;
    rotation = rotation || 0;
    color = color || 0;
    speed = speed || 1;


    return {
      x: x,
      y: y,
      scale: scale,
      color: color,
      speed: speed,

      eFrame: function(){
        if(keydown.left || keydown.a){
          x -= speed;
        }
        if(keydown.right || keydown.d){
          x += speed;
        }
        if(keydown.up || keydown.w){
          y -= speed;
        }
        if(keydown.down || keydown.s){
          y += speed;
        }

        let distX = mouseX - x;
        let distY = mouseY - y;

        rotation = Math.atan2(distY, distX);

        return true;
      },
      fire: function(){
        //Pre-computing ratios so they do not have to computed multiple times
        var cosRatio = Math.cos(rotation);
        var sinRatio = Math.sin(rotation);

        var bulletSpeed = 2;

        var tempBullet = Bullet(
          x + TURRET_LENGTH * cosRatio,   //x
          y + TURRET_LENGTH * sinRatio,   //y
          bulletSpeed * cosRatio,         //xSpeed
          bulletSpeed * sinRatio,         //ySpeed
          1,                              //reflections
          bulletContainer                 //parent
        );

        bulletContainer.push(tempBullet);
      },
      draw: function(){
        drawRotated(ctx, x, y, rotation, Tank.drawOrigin, ctx, scale);
        //draws at its position based on its rotation
        Tank.drawCursor(x, y, rotation);
        //draw line to cursor
      }

    }
  }

  Tank.drawCursor = function (x, y, rotation){
    ctx.save();
    //save canvas settings

    //Draw line
    setLineStyle(ctx, 4, 0x2940d8, [5, 5]);
    ctx.moveTo(x + TURRET_LENGTH * Math.cos(rotation), y + TURRET_LENGTH * Math.sin(rotation));
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    //Draw cross
    drawCross(ctx, mouseX, mouseY, 25, 8, 0x2940d8, 0.4, 'round');

    ctx.restore();
    //restore canvas settings
  }


  Tank.drawOrigin = function (ctx, scale){
    SPRITE.setScale(scale);

    SPRITE.draw(ctx, -OFFSET_X*scale, -OFFSET_Y*scale);
  }

  window.Tank = function(x, y, scale, rotation, color, speed){
    var tank = Tank(x, y, SCALE, rotation, color, speed)

    document.addEventListener("ENTER_FRAME", function(e){
      tank.eFrame();
    }, false)

    canvas.addEventListener("click", function(e){
      tank.fire();
    }, false)

    return tank;
  }

//ENCLOSURE
}());
