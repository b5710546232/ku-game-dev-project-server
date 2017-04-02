class PlayerList {
  constructor() {
    this.players = []
    this.positionX = 1.5;
    this.remotes = []
    this.ID=0;
  }
  addRemote(remote) {
    this.remotes.push(remote)
  }


  addPlayer(player){
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

  broadcast(data) {
    this.remotes.forEach((remote) => {
      remote.send(data)
    })
  }

  broadcastExcept(exceptRemote, data) {
    this.remotes.forEach((remote) => {
      if (remote == exceptRemote) return
      remote.send(data)
    })
  }
}


module.exports = PlayerList