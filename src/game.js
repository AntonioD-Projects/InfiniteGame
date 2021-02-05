/*TO DO:
*A way to get to a new room
**Rooms change in size when a new one is entered
**The player should start the room from the space where the door was in the last room
*Restart the game after losing
*Enemies spawn in a random place

*Maybe something to prevent enemies/doors/items from spawning too close to the player
*Maybe add CSS to the HTML pages. It's not needed, but it would make the pages look better.

BUG: Text changes sizes slightly when moving. Is there a way to do it with percents instead of always being a set pixel size?
CLEANUP: An easier way to check what's directly next to a space on the grid. getGridPosition is only for the player, it should be able to go from any position.
CLEANUP: Reorganize functions and variables so they're in a more logical order*/

//Create the canvas
function setup() {
  createCanvas(600, 800);
}

//Draw the grid
function draw() {
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
      xPos = 60 * i;
      yPos = (60 * j) + 60;
      textSize(50);
      switch(grid[i][j]) {
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
  var healthY = 660;
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

var grid = [];
var width = 10;
var height = 10;
var playerHealth = 5;
var gameRunning = true;
var healthItemX = 0;
var healthItemY = 0;
var doorX = 0;
var doorY = 0;
var enemyX = 3;
var enemyY = 3;
var enemyDirection = 0;

for(var i = 0; i < width; i++){
  grid.push([]);
  for(var j = 0; j < height; j++){
    grid[i].push("wall");
  }
}
for(var i = 1; i < width - 1; i++){
  for(var j = 1; j < height - 1; j++){
    grid[i][j] = "floor";
  }
}

//enemy movement
function enemyMove(){
  grid[enemyX][enemyY] = "floor"
  enemyDirection = getRandomIntInclusive(1,4);
  enemyDirection = Math.round(enemyDirection);
  if ((enemyDirection == 1) && (grid[enemyX - 1][enemyY] == "floor")){
    enemyX = enemyX - 1;
  } else if ((enemyDirection == 2) && (grid[enemyX + 1][enemyY] == "floor")){
    enemyX = enemyX + 1;
  } else if ((enemyDirection == 3) && (grid[enemyX][enemyY - 1] == "floor")){
    enemyY = enemyY - 1;
  } else if ((enemyDirection == 4) && (grid[enemyX][enemyY + 1] == "floor")){
    enemyY = enemyY + 1;
  }
  if ((enemyDirection == 1) && (grid[enemyX - 1][enemyY] == "player")){
    playerHealth = playerHealth - 1;
  } else if ((enemyDirection == 2) && (grid[enemyX + 1][enemyY] == "player")){
    playerHealth = playerHealth - 1;
  } else if ((enemyDirection == 3) && (grid[enemyX][enemyY - 1] == "player")){
    playerHealth = playerHealth - 1;
  } else if ((enemyDirection == 4) && (grid[enemyX][enemyY + 1] == "player")){
    playerHealth = playerHealth - 1;
  }
  grid[enemyX][enemyY] = "enemy";
}

function createHealthItem() {
  while (grid[healthItemX][healthItemY] != "floor") {
    healthItemX = getRandomIntInclusive(1,(width - 1));
    healthItemX = Math.round(healthItemX);
    healthItemY = getRandomIntInclusive(2,(width - 1));
    healthItemY = Math.round(healthItemX);
  }
  grid[healthItemX][healthItemY] = "healthItem";
}

function createDoor() {
  while (grid[doorX][doorY] != "floor") {
    doorX = getRandomIntInclusive(1,(width - 1));
    doorX = Math.round(doorX);
    doorY = getRandomIntInclusive(2,(height - 1));
    doorY = Math.round(doorY);
  }
  grid[doorX][doorY] = "door";
}

function getGridPosition(keyCode) {
  if ((keyCode === LEFT_ARROW) || (keyCode == 1)) {
    return grid[playerX - 1][playerY];
  } else if ((keyCode === RIGHT_ARROW) || (keyCode == 2)) {
    return grid[playerX + 1][playerY];
  } else if ((keyCode === UP_ARROW) || (keyCode == 3)) {
    return grid[playerX][playerY - 1];
  } else if ((keyCode === DOWN_ARROW) || (keyCode == 4)) {
    return grid[playerX][playerY + 1];
  }
}

//player movement
playerX = 1;
playerY = 2;
grid[playerX][playerY] = "player";
function keyPressed() {
  if (gameRunning == true) {
    grid[playerX][playerY] = "floor"
    if (getGridPosition(keyCode) == "enemy") {
      playerHealth = playerHealth - 1;
    }
    if (getGridPosition(keyCode) == "healthItem") {
      playerHealth = playerHealth + 1;
      grid[healthItemX][healthItemY] = "floor";
    }
    if (getGridPosition(keyCode) == "door") {
      console.log("Door has been activated")
      //We need a function that creates a new room
    }
    if ((keyCode === LEFT_ARROW) && (grid[playerX - 1][playerY] == "floor")) {
      playerX = playerX - 1;
    } else if ((keyCode === RIGHT_ARROW) && (grid[playerX + 1][playerY] == "floor")) {
      playerX = playerX + 1;
    } else if ((keyCode === UP_ARROW) && (grid[playerX][playerY - 1] == "floor")) {
      playerY = playerY - 1;
    } else if ((keyCode === DOWN_ARROW) && (grid[playerX][playerY + 1] == "floor")) {
      playerY = playerY + 1;
    }
    background("#FFFFFF");
    grid[playerX][playerY] = "player";
    grid[enemyX][enemyY] = "enemy";
    enemyMove();
  }
}

//Run functions to spawn objects
enemyMove();
createHealthItem();
createDoor();

//Debug: console messages that show variables
console.log("Health item X:");
console.log(healthItemX);
console.log("Health item Y:");
console.log(healthItemY);
console.log("Door X:");
console.log(doorX);
console.log("Door Y:");
console.log(doorY);
console.log(grid);

//Better version of math.random()
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}