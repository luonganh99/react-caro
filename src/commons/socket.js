import SocketIOClient from 'socket.io-client';
const baseURL = process.env.REACT_APP_USER_BASE_URL;

let socket;

export const initiateSocket = (authData) => {
    socket = SocketIOClient(baseURL, {
        transports: ['websocket', 'polling', 'flashsocket'],
        withCredentials: true,
        extraHeaders: {
            'my-custom-header': 'abcd',
        },
        query: {
            username: authData.userInfo.username || authData.userInfo.email,
        },
    });
    console.log('Connecting socket ...');
    if (socket) {
        socket.emit('online');
    }
};

export const getOnlineUserRes = (cb) => {
    if (!socket) return cb(true);

    console.log('getOnlineUserRes');

    socket.on('getOnlineUserRes', (data) => {
        return cb(null, data);
    });
};

export const getOnlineUserReq = () => {
    if (socket) {
        console.log('getOnlineUserRes');
        socket.emit('getOnlineUserReq');
    }
};

export const joinBoard = (boardId) => {
    if (socket) {
        console.log('joinBoard');
        socket.emit('joinBoard', boardId);
    }
};

export const moveChessman = (data) => {
    if (socket) {
        socket.emit('moveChessman', data);
    }
};

export const newMoveChessman = (cb) => {
    if (!socket) return cb(true);

    socket.on('newMoveChessman', (data) => {
        return cb(null, data);
    });
};

export const getBoardRes = (cb) => {
    if (!socket) return cb(true);

    socket.on('getBoardRes', (data) => {
        return cb(null, data);
    });
};
