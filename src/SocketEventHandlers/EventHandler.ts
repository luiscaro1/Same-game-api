import { Socket } from 'socket.io';
import voiceEvents from '@/SocketEventHandlers/Voice';

export default function EventHandlers(socket: Socket): void {
  voiceEvents(socket);
}
