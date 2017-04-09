let packet = require('./packet')
class Game {
    constructor(RemoteProxy){
         this.RemoteProxy = RemoteProxy
        setInterval(this.update,40)  
    }
    update(){
        console.log(this.RemoteProxy)
        if(this.RemoteProxy){
            let players = []
            room.remotes.forEach(function(remote) {
            if(remote) {
                players.push(remote.player)
            }
        })
        console.log('update')
        // this.room.broadcast(packet.make_players_info(players))
        }
    }
}
module.exports = Game;