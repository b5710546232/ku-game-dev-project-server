var packet_writer = require('dgt-net').packet_writer

var packet = {


  ////////////////////////////////////////////////////////////////////////////////
  // Client to Server
  ////////////////////////////////////////////////////////////////////////////////

  CS_LOGIN: 10001,
  CS_PING: 10002,
  CS_QUESTION: 10003,
  CS_CHAT: 10004,
  CS_MOVE_PLAYER: 10005,


  ////////////////////////////////////////////////////////////////////////////////
  // Server to Client
  ////////////////////////////////////////////////////////////////////////////////

  SC_ERROR: 20000,
  SC_LOGGED_IN: 20001,
  SC_PING_SUCCESS: 20002,
  SC_QUESTION: 20003,
  SC_CHAT: 20004,
  SC_NEW_PLAYER: 20005,
  SC_ALL_PLAYERS_INFO:20006,
  SC_PLAYER_INFO:20007,
  SC_PLAYER_DISCONNECT:20008,
};


////////////////////////////////////////////////////////////////////////////////
// Received Packets
////////////////////////////////////////////////////////////////////////////////

packet[packet.CS_LOGIN] = function (remoteProxy, data) {
  if (!data.completed()) return true;
  remoteProxy.login();
  remoteProxy.newPlayer();
  remoteProxy.getAllplayersInfo();
}

packet[packet.CS_PING] = function (remoteProxy, data) {
  var pingTime = data.read_uint8();
  if (!data.completed()) return true;
  remoteProxy.ping(pingTime);
}

packet[packet.CS_CHAT] = function (remoteProxy, data) {
  var msg = data.read_string();
  if (!data.completed()) return true;
  remoteProxy.chat(msg);
}

packet[packet.CS_MOVE_PLAYER] =  (remoteProxy, data) => {
  let position_x = data.read_float();
  let position_y = data.read_float();
  if (!data.completed()) return true;
  let position = {
    x:position_x,
    y:position_y
  }
  remoteProxy.movePlayer(position)
  remoteProxy.getAllplayersInfo();
}





////////////////////////////////////////////////////////////////////////////////
// Send Packets
////////////////////////////////////////////////////////////////////////////////

packet.make_error = function (msg) {
  var o = new packet_writer(packet.SC_ERROR);
  o.append_string(msg);
  o.finish();
  return o.buffer;
}

packet.make_logged_in = function () {
  var o = new packet_writer(packet.SC_LOGGED_IN);
  o.finish();
  return o.buffer;
}

packet.make_ping_success = function (ping_time) {
  var o = new packet_writer(packet.SC_PING_SUCCESS);
  o.append_uint8(ping_time);
  o.finish();
  return o.buffer;
}
packet.make_player_info = (own_id)=>{
  let o = new packet_writer(packet.SC_PLAYER_INFO);
  o.append_uint32(own_id)
  o.finish();
  return o.buffer;
}

packet.make_chat = function (msg) {
  var o = new packet_writer(packet.SC_CHAT);
  o.append_string(msg);
  o.finish();
  return o.buffer;
}

packet.make_new_player = (msg) => {
  let o = new packet_writer(packet.SC_NEW_PLAYER)
  o.append_string(msg);
  o.finish();
  return o.buffer;
}

packet.make_all_player_info = (players) => {
  let o = new packet_writer(packet.SC_ALL_PLAYERS_INFO)
  let playerLength = players.length
  o.append_uint8(playerLength)
  players.forEach((player) => {
    console.log("player",player.id)
    console.log("player - posox",String(player.positionX))
    o.append_uint32(player.id)
    o.append_string(String(player.position.x))
    o.append_string(String(player.position.y))
  })
  console.log("output",o)
  o.finish();
  return o.buffer;
}

packet.make_player_disconnect = (id) => {
  let o = new packet_writer(packet.SC_ALL_PLAYERS_INFO)
  o.append_uint32(id)
  o.finish();
  return o.buffer;
}




////////////////////////////////////////////////////////////////////////////////
// Export Module
////////////////////////////////////////////////////////////////////////////////

module.exports = packet;