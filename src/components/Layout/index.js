import React, { useEffect } from 'react';
import socket from '../../commons/socket';
import Header from '../Header';

const Layout = ({ children }) => {
    useEffect(() => {
        socket.emit('online');
    }, []);

    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default Layout;
