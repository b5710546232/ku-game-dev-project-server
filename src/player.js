class Player {
  constructor() {
    this.position = {
      x: randomInt(-5, 5),
      y: randomInt(-5, 5)
    }
    this.positionX = 1.5;
    this.remotes = []
  }
  addId(id){
    this.id = id;
  }
  
}
let randomInt = (low, high)=> {
    return Math.floor(Math.random() * (high - low) + low);
}

module.exports = Player