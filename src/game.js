//TO DO:
//Restart the game after losing
//A way to get to a new room
//Rooms change in size when a new one is entered
//The player should start the room from the space where the door was in the last room
//Bug: Text changes sizes slightly when moving
//Cleanup: Easier way to check what's directly next to a space on the grid
//Cleanup: Reorganize functions and variables so they're in a more logical order

//setup game
function setup() {
  createCanvas(600, 800);
}

//draw the grid
function draw() {
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
      if (grid[i][j] == "wall"){
        textSize(50);
        text("--", i*60, j*60)  
      }
      if (grid[i][j] == "player"){
        text("P", i*60, j*60)  
      }
      if (grid[i][j] == "enemy"){
        text("E", i*60, j*60)  
      }
      if (grid[i][j] == "healthItem"){
        text("H", i*60, j*60)  
      }
      if (grid[i][j] == "door"){
        text("D", i*60, j*60)  
      }
      //rect(i*60, j*60, 60, 60);
    }
  }
  drawPlayerHealth();
}

function drawPlayerHealth() {
  //textSize(32);
  var healthX = 0;
  var healthY = 600;
  text("Your Health:", healthX, healthY)
  fill("red")
  for(var i = 0; i < playerHealth; i++){
    healthX = healthX + 40;
    text("H", healthX, healthY + 50)
  }
  if (playerHealth < 1) {
    drawGameOver();
    gameRunning = false;
  }
  fill("black")
}

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

for(var i = 0; i < width; i++){
  grid.push([]);
  for(var j = 0; j < height; j++){
    grid[i].push("wall");
  }
}
for(var i = 1; i < width - 1; i++){
  for(var j = 2; j < height - 1; j++){
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

enemyX = 3;
enemyY = 3;
enemyDirection = 0;
enemyMove();
createHealthItem();
createDoor();
console.log("Health item X:");
console.log(healthItemX);
console.log("Health item Y:");
console.log(healthItemY);
console.log("Door X:");
console.log(doorX);
console.log("Door Y:");
console.log(doorY);
console.log(grid);

/*
Health item and door don't show up if:
X equals 1 or 9
Y equals 1 or 9
grid x is 10
grid y is 10
Graphically, x is 10 and y is 9
Should the graph be redrawn to display one more row vertically?

There's also an error if the door or health item is spawned on the same spot

NOTE: The first two columns of grid, printed in the log, are walls.
*/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}