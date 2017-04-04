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

  addPlayer(player) {
    player.addId(this.ID)
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

  broadcastExcept(exceptPlayer, data) {
    this.players.forEach((player) => {
      if (player == exceptPlayer) return
      player.send(data)
    })
  }
}


module.exports = PlayerList