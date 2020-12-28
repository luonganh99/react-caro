import React, { useEffect } from 'react';
import socket from '../../commons/socket';
import Header from '../Header';
import OnlineList from '../OnlineList';

const Layout = ({ children }) => {
    useEffect(() => {
        socket.emit('online');
    }, []);

    return (
        <div>
            <Header />
            {children}
            <OnlineList />
        </div>
    );
};

export default Layout;
