class Player {
  constructor(id) {
    this.position = {
        x: randomInt(-4, 4),
        y: randomInt(-4, 4)
      },
      this.id = id;
    this.speed = 0.15
    this.health = 1,
      this.isAlive = true
  }

  //h :  Horizontal Input Axis from Unity
  //v : Vertical Input Axis from Unity
  move(h, v) {
    let prevX = this.position.x;
    let prevY = this.position.y;
    let newX = this.position.x + (h * this.speed);
    let newY = this.position.y + (v * this.speed);
    // range [ -6.32, 6.32 ]
    if ((newX >= -6.32 && newX <= 6.32) &&
      (newY >= -6.32 && newY <= 6.32)
    ) {


      this.position.x = (newX * 1000) / 1000;
      this.position.y = (newY * 1000) / 1000;
    }
    // console.log("[PlayerRemote] Update players's postion from ", prevX,",",prevY, " to ", this.position.x,",",this.position.y);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.isAlive = false;
    }
  }

}
let randomInt = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
}

module.exports = Player