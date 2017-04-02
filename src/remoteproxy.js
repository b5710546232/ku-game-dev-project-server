let server = require('dgt-net').server
let packet = require('./packet')

let Room = require('./room')
let room = new Room()
const PlayerList = require('./playerList')
const Player = require('./player')
let playerList = new PlayerList();
var PLAYER_LIST = []
let ID = 0;

////////////////////////////////////////////////////////////////////////////////
// Remote Proxy (Server Side)
////////////////////////////////////////////////////////////////////////////////

class RemoteProxy extends server.RemoteProxy {

  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
    room.addRemote(this)
  }

  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
    playerList.removeRemote(this)
    room.removeRemote(this)
    this.getAllplayersInfo();
  }

  login() {
    console.log('RemoteProxy login')
    this.send(packet.make_logged_in())
  }

  chat(msg) {
    console.log('RemoteProxy chat: ' + msg)
    room.broadcast(packet.make_chat(msg))
  }

  ping(pingTime) {
    console.log('RemoteProxy ping: ' + pingTime)
    this.send(packet.make_ping_success(pingTime))
  }
  newPlayer(){
    let data = "should add new plaeyer"
    console.log('RemoteProxy new player: ' + data)
    let player = new Player();
    playerList.addRemote(this)
    playerList.addPlayer(player)
    playerList.broadcast(packet.make_new_player(data))
  }

  getAllplayersInfo(){
    let players = playerList.players;
    console.log('RemoteProxy playerInfos number :'+PLAYER_LIST.length)
    playerList.broadcast(packet.make_all_player_info(players))
  }
}

module.exports = RemoteProxy