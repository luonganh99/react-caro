import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { axiosUser } from '../../../api/axiosUser';
import { useAuthContext } from '../../../context/AuthContext';
import RankItem from './RankItem';
import './styles.scss';

const RankList = () => {
    const { authData } = useAuthContext();
    const [userList, setUserList] = useState([]);
    console.log(userList);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const resUserList = await axiosUser.get('/users');
                const formatedUserList = resUserList
                    .slice(0, 20)
                    .map((user) => ({
                        avatar: user.avatar,
                        username: user.username,
                        cups: user.cups,
                        total: user.total,
                    }))
                    .sort((a, b) => b.cups - a.cups);

                setUserList(formatedUserList);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="rank-list">
            <Typography color="primary" className="header">
                Rank
            </Typography>
            <div className="container">
                <RankItem
                    isUser={true}
                    user={authData.userInfo}
                    index={userList.findIndex(
                        (user) => authData.userInfo.username === user.username,
                    )}
                />
                {userList.map((user, index) => (
                    <RankItem key={user.username} user={user} index={index} />
                ))}
            </div>
        </div>
    );
};

export default RankList;
