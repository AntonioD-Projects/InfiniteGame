class Room{
    constructor(roomWidth, roomHeight){
        console.log("Room constructed")
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.grid = [];
        this.generateRoom(10, 10);
    }
    generateRoom() {
      console.log("Room generated")
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
        this.createDoor();
        this.createHealthItem();
//        this.createEnemy();
      }
    createHealthItem() {
      console.log("Health item created")
      this.healthItemX = 0;
      this.healthItemY = 0;
      while (this.grid[this.healthItemX][this.healthItemY] != "floor") {
        this.healthItemX = getRandomIntInclusive(1,(this.roomWidth - 1));
        this.healthItemX = Math.round(this.healthItemX);
        this.healthItemY = getRandomIntInclusive(2,(this.roomWidth - 1));
        this.healthItemY = Math.round(this.healthItemX);
      }
      this.grid[this.healthItemX][this.healthItemY] = "healthItem";
    }
    createDoor() {
      console.log("Door created")
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
    /*
    createEnemy() {
      console.log("Enemy created")
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
    */
}