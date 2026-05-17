import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_WS_URL ?? 'http://localhost:3000', {
  autoConnect: false,
  withCredentials: true,
  transports: ['websocket'],
})

/** Call once after login to open the connection */
export function connectSocket(token: string) {
  socket.auth = { token }
  socket.connect()
}

/** Call on logout */
export function disconnectSocket() {
  socket.disconnect()
}
