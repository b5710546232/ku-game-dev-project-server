let packet = require('./packet')

class Room {
  constructor() {
    this.remotes = []
    this.players = []

    setInterval(() => {

      this.players.splice(0, this.players.length)

      // let playersInfo = []
      
      // this.players.forEach((player) =>{
      //     if(player !== null) {
      //       playersInfo.push(player)
      //     }
      // })
      this.remotes.forEach((remote) => {
        if(remote != null || remote != undefined) {
          if(remote.player != undefined) {
            // console.log(remote.player)
            if(remote.player.isAlive) {
              this.players.push(remote.player)
            }
            // info += remote.player.id + ", "
          }
        }
      })

      this.broadcast(packet.make_players_info(this.players))

      // this.remotes.forEach((remote) =>{
      //   if(remote !== null) {
      //     // console.log("Send players' info")
      //     remote.player.position.x += remote.player.speed * 0.015
      //     remote.player.position.y += Math.sin(remote.player.speed * Math.PI)
      //     remote.send(packet.make_players_info(players))
      //   }
      // })
    }, 100)
  }

  addRemote(remote) {
    this.remotes.push(remote)
  }

  addPlayer(player) {
    this.players.push(player)
  }

  removeRemote(remote) {
    let index = this.remotes.indexOf(remote)
    this.remotes[index] = undefined
    // remote.
    // this.remotes.splice(this.remotes.indexOf(remote), 1)
    // this.players.
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