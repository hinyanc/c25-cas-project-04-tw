import {REACT_APP_API_SERVER} from '@env';
import SocketIOClient from 'socket.io-client';

export const socket = SocketIOClient(REACT_APP_API_SERVER);
