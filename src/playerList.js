const Player = require('./player')

class PlayerList {
  constructor() {
    this.players = []
    this.positionX = 1.5;
    this.remotes = []
    this.ID=0;
  }

  addRemote(player) {
    this.players.push(player)
  }


  addPlayer(){
    let player = new Player(this.ID)
    this.players.push(player)
    this.ID++;
  }

  removeRemote(remote) {
    console.log('index of remote',this.remotes.indexOf(remote))
    let index = this.remotes.indexOf(remote)
    this.removePlayer(index)
    this.remotes.splice(this.remotes.indexOf(remote), 1)
  }

  removePlayer(index){
    this.players.splice(this.players.indexOf(index), 1)
  }

  // remotePlayer(player) {
  //   this.players.splice(this.players.indexOf(player), 1)
  // }

  broadcast(data) {
    this.remotes.forEach((remote) => {
      remote.send(data)
    })
  }

  movePlayer(remote,position){
    let index = this.getPlayerIndex(remote);
    console.log(`\n${index} ::: moving\n`)
    console.log('position',position)
    this.players[index].move(position);
  }
  

  broadcastExcept(exceptRemote, data) {
    this.remotes.forEach((remote) => {
      if (remote == exceptRemote) return
      remote.send(data)
    })
  }

  getPlayerIndex(remote){
    let index = this.remotes.indexOf(remote)
    
    let id = this.players[index].player_id;
    console.log("\n")
    console.log(" ::::  id ::"+id)
    console.log(" :::: "+remote)
    console.log(" :::: "+JSON.stringify(this.players[index]))
    console.log(" :::: "+index)
    console.log("\n")

    return index;
  }

}


module.exports = PlayerList