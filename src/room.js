class Room{
    constructor(roomWidth, roomHeight){
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.generateRoom(10, 10);
    }
    generateRoom(width, height) {
      this.roomWidth = width;
      this.roomHeight = height;
      this.grid = [];
        for(var i = 0; i < this.roomWidth; i++){
            this.grid.push([]);
          for(var j = 0; j < this.roomHeight; j++){
            this.grid[i].push("wall");
          }
        }
        for(var i = 1; i < this.roomWidth - 1; i++){
          for(var j = 1; j < this.roomHeight - 1; j++){
            this.grid[i][j] = "floor";
          }
        }
        this.createHealthItem();
        this.createDoor();
        this.createEnemy();
      }
    createHealthItem() {
      this.healthItemX = 0;
      this.healthItemY = 0;
      while (this.grid[this.healthItemX][this.healthItemY] != "floor") {
        this.healthItemX = getRandomIntInclusive(1,(this.roomWidth - 1));
        this.healthItemX = Math.round(this.healthItemX);
        this.healthItemY = getRandomIntInclusive(2,(this.roomHeight - 1));
        this.healthItemY = Math.round(this.healthItemY);
      }
      this.grid[this.healthItemX][this.healthItemY] = "healthItem";
    }
    createDoor() {
      this.doorX = 0;
      this.doorY = 0;
      while (this.grid[this.doorX][this.doorY] != "floor") {
        this.doorX = getRandomIntInclusive(1,(this.roomWidth - 1));
        this.doorX = Math.round(this.doorX);
        this.doorY = getRandomIntInclusive(2,(this.roomHeight - 1));
        this.doorY = Math.round(this.doorY);
      }
      this.grid[this.doorX][this.doorY] = "door";
    }
    createEnemy() {
      this.enemyX = 0;
      this.enemyY = 0;
      while (this.grid[this.enemyX][this.enemyY] != "floor") {
        this.enemyX = getRandomIntInclusive(1,(this.roomWidth - 1));
        this.enemyX = Math.round(this.enemyX);
        this.enemyY = getRandomIntInclusive(2,(this.roomHeight - 1));
        this.enemyY = Math.round(this.enemyY);
      }
      this.grid[this.enemyX][this.enemyY] = "enemy";
    }
    enemyMove(){
      this.grid[this.enemyX][this.enemyY] = "floor";
      this.enemyDirection = getRandomIntInclusive(0,3);
      this.enemyDirection = Math.round(this.enemyDirection);
      this.movesX = [-1,1,0,0];
      this.movesY = [0,0,-1,1];
      this.newX = this.enemyX + this.movesX[this.enemyDirection];
      this.newY = this.enemyY + this.movesY[this.enemyDirection];
      if ((this.grid[this.newX][this.newY] == "floor")){
        this.enemyX = this.newX;
        this.enemyY = this.newY;
      }
      if ((this.grid[this.newX][this.newY] == "player")){
        playerHealth = playerHealth - 1;
      }
      this.grid[this.enemyX][this.enemyY] = "enemy";
    }
}