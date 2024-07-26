import { io } from 'socket.io-client';

const url = process.env.NEXT_PUBLIC_API_ROUTE

// Connect to Socket.IO server
const socket = io(url || "https://dreamyverse-backend.onrender.com")

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

export default socket;
