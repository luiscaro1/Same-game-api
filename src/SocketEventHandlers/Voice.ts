import { Socket } from 'socket.io';

const socketsStatus: { [field: string | number]: any } = {};

export default function voiceEvents(socket: Socket): void {
  const socketId = socket.id;
  socketsStatus[socket.id] = {};

  socket.on('voice', (data: string) => {
    if (!socketsStatus[socketId].mute) socket.emit('send', data);
  });

  socket.on('userInformation', (data) => {
    socketsStatus[socketId] = data;

    socket.emit('usersUpdate', socketsStatus);
  });

  socket.on('disconnect', () => {
    delete socketsStatus[socketId];
  });
}
