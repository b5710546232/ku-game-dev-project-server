class Player {
  constructor(id) {
    this.position = {
      x: randomInt(-6, 6),
      y: randomInt(-4.5, 4.5)
    },
    this.id = id;
    this.speed = 1;
    // this.positionX = 1.5;
    // this.remotes = []
  }
  // addId(id){
  //   this.id = id;
  // }
  
}
let randomInt = (low, high)=> {
    return Math.floor(Math.random() * (high - low) + low);
}

module.exports = Player