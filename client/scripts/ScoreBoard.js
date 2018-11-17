//*IMPORTS*
import {setFillStyle} from './controllers/DrawController.js'
import {roundRect} from './controllers/DrawController.js'
import {drawText} from './controllers/TextController.js'

import {CANVAS_HEIGHT} from './Main.js'

//*IMPORTS*

//*CLASS CONSTANTS*
const FIRST_ROW = 130;
const SPACING = 50;

const CROWN = Sprite('golden_crown');

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
        newScores = [{user: "Zom", score: 100}, {user: "Sam", score: 200}]

        //sort scores from highest to lowest
        scores = newScores.sort(function(a, b){
          return b.score - a.score
        });
      },

      draw: function(ctx){
        drawBoard(ctx, 0xff0000);
        //draws at its position based on its rotation
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
    drawText(ctx, "Score: 0", 20, 35, 0xffffff, 20, "Calibri");

    drawText(ctx, "Rank", 10, FIRST_ROW - 40, 0xffffff, 20, "Calibri");
    drawText(ctx, "Player", 80, FIRST_ROW - 40, 0xffffff, 20, "Calibri");
    drawText(ctx, "Score", 175, FIRST_ROW - 40, 0xffffff, 20, "Calibri");


    for(var i = 0; i < scores.length; i++){
      if(i == 0){
        //first place! Draw golden crown.

        console.log("Crown obtained", CROWN)
        CROWN.setScale(0.8);
        CROWN.draw(ctx, 5, 100);
      }else{
        drawText(ctx, i + 1, 25, FIRST_ROW + i * SPACING, 0xffffff, 20, "Calibri");
      }

      drawText(ctx, scores[i].user, 80, FIRST_ROW + i * SPACING, 0xffffff, 20, "Calibri");
      drawText(ctx, scores[i].score, 180, FIRST_ROW + i * SPACING, 0xffffff, 20, "Calibri");

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
