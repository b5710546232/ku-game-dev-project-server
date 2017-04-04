class Room {
  constructor() {
    this.remotes = []
  }

  addRemote(remote) {
    this.remotes.push(remote)
  }

  removeRemote(remote) {
    let index = this.remotes.indexOf(remote)
    this.remotes[index] = null
    // this.remotes.splice(this.remotes.indexOf(remote), 1)
  }

  broadcast(data) {
    this.remotes.forEach((remote) => {
      if(remote) {
        remote.send(data)
      }
    })
  }

  broadcastExcept(exceptRemote, data) {
    this.remotes.forEach((remote) => {
      if (remote == exceptRemote ) return
      if(remote) {
        remote.send(data)
      } 
    })
  }
}

module.exports = Room