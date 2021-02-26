/*TO DO:
Important features:
*A way to get to a new room.
*Rooms change in size when a new one is entered.
*Restart the game after losing.
*Enemies spawn in a random place.
*Enemy should be a class so that multiple can spawn at once.

Possible additions:
*Add limits to how close an object can spawn to the player. I've already made it so they can't spawn on the same place,
but having them not spawn directly next to each other would work too.
*Add CSS to the HTML pages. It's not needed, but it would make the pages look better.
*CHECK: Do enemies move before or after the room is drawn? They should spawn in as it's drawn, but only move after the player first moves.

Backend improvements:
*BUG: Text changes sizes slightly when moving. Is there a way to do it with percents instead of always being a set pixel size?
*CLEANUP: An easier way to check what's directly next to a space on the grid. getGridPosition is only for the player, it should be able to go from any position.
*CLEANUP: Reorganize functions and variables so they're in a more logical order.
*/

//Create the canvas
function setup() {
  createCanvas(800, 800);
}

//Draw the grid
function draw() {
  for(var i = 0; i < room.roomWidth; i++){
    for(var j = 0; j < room.roomHeight; j++){
      xPos = 60 * i;
      yPos = (60 * j) + 60;
      textSize(50);
      switch(room.grid[i][j]) {
        case "wall":
          text("--", xPos, yPos)
          break
        case "player":
          text("P", xPos, yPos)
          break
        case "enemy":
          text("E", xPos, yPos)
          break
        case "healthItem":
          text("H", xPos, yPos)
          break
        case "door":
          text("D", xPos, yPos)
          break
      }
      //rect(i*60, j*60, 60, 60);
    }
  }
  drawPlayerHealth();
}

//Draw the health at the bottom of the screen
function drawPlayerHealth() {
  //textSize(32);
  var healthX = 0;
  var healthY = (room.roomHeight * 60) + 60;
  text("Your Health:", healthX, healthY)
  fill("red")
  for(var i = 0; i < playerHealth; i++){
    text("H", healthX, healthY + 50)
    healthX = healthX + 40;
  }
  if (playerHealth < 1) {
    drawGameOver();
    gameRunning = false;
  }
  fill("black")
}

//If the player runs out of health, draw this text
function drawGameOver() {
  fill("red")
  text("You've run out of health!", 10, 300)
  fill("black")
}

//  playerHealth * "♡"

/*
roomWidth and roomHeight size limits:

width: 3 is the minimum it can be without breaking. 6 seems like a good minimum. Anything above 13 has the walls go off-screen.
height: Below 5: Enemy spawns inside walls. Above 11: Health goes off-screen.
*/

var room = new Room(10, 10);
var playerHealth = 5;
var gameRunning = true;
var enemyX = 3;
var enemyY = 3;
room.grid[enemyX][enemyY] = "enemy";
var enemyDirection = 0;

//Enemy movement
//This enemy moves properly. There is a duplicate enemy that appears somewhere.

//The enemy can sometimes spawn over the health item. Use the console to figure out what the variable is set as.
function enemyMove(){
  room.grid[enemyX][enemyY] = "floor";
  enemyDirection = getRandomIntInclusive(0,3);
  enemyDirection = Math.round(enemyDirection);
  movesX = [-1,1,0,0];
  movesY = [0,0,-1,1];
  newX = enemyX + movesX[enemyDirection];
  newY = enemyY + movesY[enemyDirection];
  if ((room.grid[newX][newY] == "floor")){
    enemyX = newX;
    enemyY = newY;
  }
  if ((room.grid[newX][newY] == "player")){
    playerHealth = playerHealth - 1;
  }
  room.grid[enemyX][enemyY] = "enemy";
  console.log("Enemy is at: (" + str(newX) + "," + str(newY) + ")")
}

function getGridPosition(keyCode) {
  if ((keyCode === LEFT_ARROW) || (keyCode == 1)) {
    return room.grid[playerX - 1][playerY];
  } else if ((keyCode === RIGHT_ARROW) || (keyCode == 2)) {
    return room.grid[playerX + 1][playerY];
  } else if ((keyCode === UP_ARROW) || (keyCode == 3)) {
    return room.grid[playerX][playerY - 1];
  } else if ((keyCode === DOWN_ARROW) || (keyCode == 4)) {
    return room.grid[playerX][playerY + 1];
  }
}

//Player movement
playerX = 1;
playerY = 1;
room.grid[playerX][playerY] = "player";
function keyPressed() {
  if (gameRunning == true) {
    room.grid[playerX][playerY] = "floor"
    if (getGridPosition(keyCode) == "enemy") {
      playerHealth = playerHealth - 1;
    }
    if (getGridPosition(keyCode) == "healthItem") {
      playerHealth = playerHealth + 1;
      room.grid[room.healthItemX][room.healthItemY] = "floor";
    }
    if (getGridPosition(keyCode) == "door") {
      console.log("Door has been activated")
      room.generateRoom();
    }
    if ((keyCode === LEFT_ARROW) && (room.grid[playerX - 1][playerY] == "floor")) {
      playerX = playerX - 1;
    } else if ((keyCode === RIGHT_ARROW) && (room.grid[playerX + 1][playerY] == "floor")) {
      playerX = playerX + 1;
    } else if ((keyCode === UP_ARROW) && (room.grid[playerX][playerY - 1] == "floor")) {
      playerY = playerY - 1;
    } else if ((keyCode === DOWN_ARROW) && (room.grid[playerX][playerY + 1] == "floor")) {
      playerY = playerY + 1;
    }
    background("#FFFFFF");
    room.grid[playerX][playerY] = "player";
    room.grid[enemyX][enemyY] = "enemy";
    enemyMove();
  }
}

//Better version of math.random()
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}