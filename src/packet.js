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
  CS_PLAYERS_INFO: 10006,
  CS_BULLET_INFO: 11002,
  CS_PROJECTILE_HIT: 11003,

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

  SC_REMOVE_PLAYER: 21001,
  SC_BULLET_INFO: 21002,

};


////////////////////////////////////////////////////////////////////////////////
// Received Packets
////////////////////////////////////////////////////////////////////////////////

packet[packet.CS_LOGIN] = function (remoteProxy, data) {
  if (!data.completed()) return true;
  remoteProxy.login();
  // remoteProxy.newPlayer();
  // remoteProxy.getAllplayersInfo();
  remoteProxy.sendPlayersInfo();
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

packet[packet.CS_MOVE_PLAYER] = function(remoteProxy, data) {
  let h = data.read_float();
  let v = data.read_float();
  if (!data.completed()) return true;
  // console.log("On received player input axes.", h, ", ", v);
  remoteProxy.updatePlayerPosition(h, v);
}

packet[packet.CS_PLAYERS_INFO] = function(remoteProxy, data) {
  if(!data.completed()) return true;
  remoteProxy.sendPlayersInfo();
}

packet[packet.CS_BULLET_INFO] = function(remoteProxy, data) {
  let x_direction = data.read_float();
  let y_direction = data.read_float();
  let z_quaternion = data.read_float();
  if (!data.completed()) return true;
  remoteProxy.sendBulletInfo(x_direction, y_direction, z_quaternion);
}

packet[packet.CS_PROJECTILE_HIT] = function(remoteProxy, data) {
  let id = data.read_uint8();
  if(!data.completed()) return true;
  remoteProxy.sendProjectileHit(id);
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

packet.make_logged_in = function (id) {
  var o = new packet_writer(packet.SC_LOGGED_IN);
  o.append_uint8(id);
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

// packet.make_new_player = (msg) => {
//   let o = new packet_writer(packet.SC_NEW_PLAYER)
//   o.append_string(msg);
//   o.finish();
//   return o.buffer;
// }

// packet.make_new_player = (player) => {
//   let o = new packet_writer(packet.SC_NEW_PLAYER)
//   o.append_uint8(id);
//   o.appe
//   o.finish();
//   return o.buffer;
// }

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

packet.make_players_info = (players) => {
  let o = new packet_writer(packet.SC_ALL_PLAYERS_INFO);
  let playerLength = players.length;
  o.append_uint8(playerLength);
  players.forEach((player) => {
    // console.log("[Packet] Add player#", player.id, " info to packet");
    o.append_uint8(player.id);
    o.append_float(player.position.x);
    o.append_float(player.position.y);
  })
  o.finish();
  return o.buffer;
}

packet.make_player_disconnect = (id) => {
  let o = new packet_writer(packet.SC_ALL_PLAYERS_INFO)
  o.append_uint32(id)
  o.finish();
  return o.buffer;
}

packet.make_remove_player = (id) => {
  let o = new packet_writer(packet.SC_REMOVE_PLAYER);
  o.append_uint8(id);
  // console.log("[Packet] id to be removed #", id);
  o.finish();
  return o.buffer;
}

packet.make_bullet_info = (id, x_direction, y_direction, z_quaternion) => {
  let o = new packet_writer(packet.SC_BULLET_INFO);
  o.append_uint8(id);
  // console.log("[Packet] #",id," shot a bullet");
  o.append_float(x_direction);
  o.append_float(y_direction);
  o.append_float(z_quaternion);
  o.finish();
  return o.buffer;
}

////////////////////////////////////////////////////////////////////////////////
// Export Module
////////////////////////////////////////////////////////////////////////////////

module.exports = packet;