// api/index.js
import openSocket from 'socket.io-client';
import { constantApi } from './constants.api';
const socket = openSocket(constantApi.url);

function connectSocket(cb) {
  // listen for any messages coming through
  // of type 'chat' and then trigger the
  // callback function with said message
  socket.on('welcome', message => {
    // console.log the message for posterity
    console.log('Đã kết nối');
    // trigger the callback passed in when
    // our App component calls connect
    cb(message);
  });
}

export { connectSocket, socket };
