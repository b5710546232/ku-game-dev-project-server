class Player {
  constructor(player_id) {
    console.log('player id ',player_id)
    this.position = {
      x: randomInt(-5, 5),
      y: randomInt(-5, 5)
    }
    this.positionX = 1.5;
    this.remotes = []
    this.player_id = player_id;
  }
  addId(id){
    this.id = id;
  }
  move(position){
    this.position.x = position.x
    this.position.y = position.y
  }
  
}
let randomInt = (low, high)=> {
    return Math.floor(Math.random() * (high - low) + low);
}

module.exports = Player