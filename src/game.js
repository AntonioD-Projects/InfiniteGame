/*TO DO:
Important features:
*Restart the game after losing.
*Allow multiple enemies to spawn at once.

Possible additions:
*Add limits to how close an object can spawn to the player. I've already made it so they can't spawn on the same place,
but having them not spawn directly next to each other would work too.
*Add CSS to the HTML pages. It's not needed, but it would make the pages look better.
*Maybe color-code some of the text.
*CHECK: Do enemies move before or after the room is drawn? They should spawn in as it's drawn, but only move after the player first moves.

Backend improvements:
*BUG: Text changes sizes slightly when moving. Is there a way to do it with percents instead of always being a set pixel size?
*BUG: Add a health cap
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

Recommended: Between 6-13 for X and 5-11 for Y.
*/

var room = new Room(10, 10); //I'm not sure if I need this
var playerHealth = 5;
var gameRunning = true;

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

//Right now, the player can spawn out of bounds when the room gets resized. Make sure they spawn in the grid.

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
      newRoomWidth = getRandomIntInclusive(6,13);
      newRoomHeight = getRandomIntInclusive(5,11);
      room.generateRoom(newRoomWidth, newRoomHeight);
      console.log("Room width is " + String(newRoomWidth));
      console.log("Room height is " + String(newRoomHeight));
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
    room.enemyMove();
  }
}

//Better version of math.random()
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}