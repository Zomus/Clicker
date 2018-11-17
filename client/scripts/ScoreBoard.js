//*IMPORTS*
import {setFillStyle} from './controllers/DrawController.js'
import {roundRect} from './controllers/DrawController.js'
import {drawText} from './controllers/TextController.js'
import {userColor} from './Main.js'

import {CANVAS_HEIGHT} from './Main.js'

//*IMPORTS*

//*CLASS CONSTANTS*
const FIRST_ROW = 130;
const SPACING = 50;

const GOLDEN_CROWN = Sprite('goldCrown');
const SILVER_CROWN = Sprite('silverCrown');
const BRONZE_CROWN = Sprite('bronzeCrown');

//**
//ENCLOSURE
(function() {

  var scores = [];

  function ScoreBoard(){

    //Assign Default Properties
    /*x = x || 0;*/


    return {
      /*x: x,*/

      updateScore: function(newScores){
        //newScores = [{user: "Zom", score: 100, color: 0xff0000}, {user: "Sam", score: 200, color: 0x0000ff}]

        newScores = newScores || []

        //sort scores from highest to lowest
        scores = newScores.sort(function(a, b){
          return b.score - a.score
        });
      },

      draw: function(ctx){
        drawBoard(ctx, 0xff0000);
        //draw the score board
      }

    }
  }

  function drawBoard(ctx, color){
    ctx.save();
    //save canvas settings

    //Background of scoreboard title
    setFillStyle(ctx, 0);
    ctx.globalAlpha = 0.5
    roundRect(ctx, 0, 5, 250, 50, {tl: 0, tr: 10, bl: 0, br: 10}, true, false);
    ctx.fill();

    //Rankings
    setFillStyle(ctx, 0);
    ctx.globalAlpha = 0.5
    roundRect(ctx, 0, 60, 255, CANVAS_HEIGHT - 80, {tl: 0, tr: 15, bl: 0, br: 15}, true, false)
    ctx.fill();

    //Text should be maximum brightness
    ctx.globalAlpha = 1;

    //Text for title
    drawText(ctx, "Score: 0", 20, 35, userColor, 20, "Calibri");

    drawText(ctx, "Rank", 10, FIRST_ROW - 40, 0xffffff, 20, "Calibri");
    drawText(ctx, "Player", 80, FIRST_ROW - 40, 0xffffff, 20, "Calibri");
    drawText(ctx, "Score", 175, FIRST_ROW - 40, 0xffffff, 20, "Calibri");


    for(var i = 0; i < scores.length; i++){
      if(i == 0){
        //first place!

        GOLDEN_CROWN.setScale(0.6);
        GOLDEN_CROWN.draw(ctx, 12, 105);
      }else if(i == 1){
        //second place!

        SILVER_CROWN.setScale(0.6);
        SILVER_CROWN.draw(ctx, 12, 105 + SPACING);
      }
      else if (i == 2){
        //third place!

        BRONZE_CROWN.setScale(0.6);
        BRONZE_CROWN.draw(ctx, 12, 105 + 2*SPACING);
      }
      else{
        drawText(ctx, i + 1, 25, FIRST_ROW + i * SPACING, scores[i].color, 20, "Calibri");
      }

      drawText(ctx, scores[i].user, 80, FIRST_ROW + i * SPACING, scores[i].color, 20, "Calibri");
      drawText(ctx, scores[i].score, 180, FIRST_ROW + i * SPACING, scores[i].color, 20, "Calibri");

      ctx.fill();
    }


    ctx.restore();
    //restore canvas settings
  }

  window.ScoreBoard = function(){
    var scoreBoard = ScoreBoard();

    return scoreBoard;
  }

//ENCLOSURE
}());
