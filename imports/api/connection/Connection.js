import { DDP } from 'meteor/ddp-client'

let _connection = Meteor.connection

export const Connection = {

  set (url, callback) {
    _connection = DDP.connect(url);
    console.log(_connection)
  },

  get () {
    return _connection
  },

  call (...args) {
    _connection.call(...args)
  },

  userId () {
    return _connection._userId
  },

  login (username, password, callback) {
    DDP.loginWithPassword(_connection, {username}, password, function (error) {
      if (!error) {
        callback.call(this, null, _connection)
      } else {
        callback.call(this, error, null)
      }
    });
  }
}