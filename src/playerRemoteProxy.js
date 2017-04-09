let server = require('dgt-net').server
let packet = require('./packet')

let Room = require('./room')
let Player = require('./player')

let room = new Room();
// let Id = 0;

// setInterval(() => {
//     let players = []
//         room.remotes.forEach(function(remote) {
//             if(remote) {
//                 players.push(remote.player)
//             }
//         })
//         // console.log("# of players currently in the room : " + players.length)
//         room.broadcast(packet.make_players_info(players))
// }, 100)

////////////////////////////////////////////////////////////////////
// Player remote proxy (Server side)

class PlayerRemoteProxy extends server.RemoteProxy {

    onConnected() {
        console.log("[PlayerRemote] There is a connection from " + this.getPeerName())
        // players.addPlayer(this)
        // room.addRemote(this)
        room.addRemote(this)
        // this.player = new Player(room.remotes.indexOf(this))
        // this.login()
        // this.has_logged_in = false
        // room.addPlayer(new Player(room.remotes.indexOf(this)))
        console.log("[PlayerRemote] Assigned Id#", room.remotes.indexOf(this))
    }

    onDisconnected() {
        console.log("[PlayerRemote] Disconnection from " + this.getPeerName())
        let myPlayerId = this.player.id;
        room.removeRemote(this)
        this.removePlayer(myPlayerId)
        
        // console.log("Remaining Ids:")
        // room.remotes.forEach((remote) => {
        //     if(remote) {
        //         console.log(remote.player.id)
        //     }
        // })
        // Broadcast to other player except itself
    }

    login() {
        console.log("[PlayerRemote] Login from " + this.getPeerName())
        this.player = new Player(room.remotes.indexOf(this))
        console.log("[PlayerRemote] Random position x:", this.player.position.x, ", ",this.player.position.y)
        this.send(packet.make_logged_in(this.player.id))
        // this.has_logged_in = true;
    }

    ping(pingTime) {
        console.log("[PlayerRemote] ping from " + this.getPeerName())
        this.send(packet.make_ping_success(pingTime))
    }

    updatePlayerPosition(h, v) {
        this.player.move(h, v)
        // let prevX = this.player.position.x;
        // let prevY = this.player.position.y;
        // // let judged_h = Math.max( Math.min(h, 1), -1);
        // // let judged_v = Math.max( Math.min(v, 1), -1);
        // let newX = this.player.position.x + (h * this.player.speed);
        // let newY = this.player.position.y + (v * this.player.speed);
        // this.player.position.x = ( newX * 1000 ) / 1000
        // this.player.position.y = ( newY * 1000 ) / 1000
        // // console.log("[PlayerRemote] Update players's postion from ", prevX,",",prevY, " to ", this.player.position.x,",",this.player.position.y);
    }

    sendPlayersInfo() {
        let players = []
        room.remotes.forEach(function(remote) {
            if(remote) {
                players.push(remote.player)
            }
        })
        // console.log("# of players currently in the room : " + players.length)
        this.send(packet.make_players_info(players))
    }
    

    removePlayer(id) {
        // console.log("[PlayerRmote] removing player#", id)
        room.broadcast(packet.make_remove_player(id))
        // let remoteRemovedPlayer = room.remotes[id]
        // remoteRemovedPlayer.player.isAli
        // if(remoteRemovedPlayer) {
        //     let newPlayer = new Player(id)
        //     remoteRemovedPlayer.player = newPlayer
        // }
        // // console.log(remoteRemovedPlayer.player)

    }

    sendBulletInfo(x_direction, y_direction, z_quaternion) {
        let id = this.player.id
        room.broadcast(packet.make_bullet_info(id, x_direction, y_direction, z_quaternion))
    }

    sendProjectileHit(id) {
        // console.log("Id#", id, " got hit broadcasting...")
        let hitPlayer = room.remotes[id].player
        console.log("Health = ", hitPlayer.health, " => ", hitPlayer.health - 1)
        let damage = 1
        if(hitPlayer.isAlive) {
            hitPlayer.takeDamage(damage)
        }
        if(!hitPlayer.isAlive) {
            this.removePlayer(id)
        }
    }

    respawn() {
        // if(this.player == undefined) {
        //     // let newPlayer = new Player(id)
        //     // remoteRemovedPlayer.player = this.player
        //     console.log("[PlayerRemoteProxy] Request to respawn. Spawning new player...")
        //     this.player = new Player(room.remotes.indexOf(this))
        // }
        if(!this.player.isAlive) {
            this.player.position.x = this.randomInt(-4, 4)
            this.player.position.y = this.randomInt(-4, 4)
            this.player.health = 1
            this.player.isAlive = true
        }
    }

    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low)
    }

}


module.exports = PlayerRemoteProxy