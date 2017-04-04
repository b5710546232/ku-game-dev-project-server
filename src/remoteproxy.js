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
    let id = playerList.getPlayerIndex(this);
    playerList.broadcastExcept(this,packet.make_player_disconnect(id))
    playerList.removeRemote(this)
    console.log("Disconnected from ID" + id)
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
    playerList.addRemote(this)
    playerList.addPlayer()

    let own_id = playerList.getPlayerIndex(this).player_id;
    console.log('owner_id ',own_id)
    this.send(packet.make_player_info(own_id))
    playerList.broadcast(packet.make_new_player(data))
  }

  getAllplayersInfo(){
    let players = playerList.players;
    console.log('RemoteProxy playerInfos number :'+PLAYER_LIST.length)
    playerList.broadcast(packet.make_all_player_info(players))
  }

   movePlayer(position){
    playerList.movePlayer(this,position);
    let indexPlayer = playerList.remotes.indexOf(this);
    let PlayerID = playerList.getPlayerIndex(this);
    console.log('RemoteProxy MovePlayer PID :'+PlayerID)
    playerList.broadcast(packet.make_all_player_info(players))
  }
  
}

module.exports = RemoteProxy