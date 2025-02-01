import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URI);

export default socket;
