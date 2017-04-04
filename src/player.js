class Player {
<<<<<<< HEAD
  constructor(id) {
    this.position = {
      x: randomInt(-6, 6),
      y: randomInt(-4.5, 4.5)
    },
=======
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
>>>>>>> eaef5ed1661ef8a5b5f5c0d25be43fc03dd8b279
    this.id = id;
    this.speed = 1;
    // this.positionX = 1.5;
    // this.remotes = []
  }
<<<<<<< HEAD
  // addId(id){
  //   this.id = id;
  // }
=======
  move(position){
    this.position.x = position.x
    this.position.y = position.y
  }
>>>>>>> eaef5ed1661ef8a5b5f5c0d25be43fc03dd8b279
  
}
let randomInt = (low, high)=> {
    return Math.floor(Math.random() * (high - low) + low);
}

module.exports = Player