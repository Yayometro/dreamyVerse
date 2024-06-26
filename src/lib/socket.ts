import { io } from 'socket.io-client';
import fetcherFetch from '@/helpers/fetcher';

const fetcher = fetcherFetch();
const url = fetcher.getBackEndURL();
console.log('Socket URL:', url);

// Connect to Socket.IO server
const socket = io("http://localhost:3503")
// const socket = io("http://localhost:3503", {
// // const socket = io(url, {
//   transports: ['websocket', 'polling'], // Ensure both transports are available
//   upgrade: false,
// });
console.log(socket)

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

export default socket;
