import { Avatar, Dialog, DialogContent, Slide, Typography } from '@material-ui/core';
import {
    AccountCircleRounded,
    DateRangeRounded,
    EmailRounded,
    EmojiEventsRounded,
    MoodRounded,
    SportsEsportsRounded,
    StarBorderRounded,
} from '@material-ui/icons';
import React, { forwardRef } from 'react';
import avatar from '../../../assets/images/avatar.jpg';
import History from '../History';
import dayjs from 'dayjs';
import './styles.scss';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = ({ userInfo, open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth="md"
            TransitionComponent={Transition}
            keepMounted
        >
            {
                <DialogContent className="content">
                    <div className="avatar-group">
                        <Avatar
                            className="avatar"
                            alt="avatar"
                            src={userInfo.avatar ? userInfo.avatar : avatar}
                        />
                        <Typography variant="h5">{userInfo.username}</Typography>
                    </div>

                    <div className="user-info">
                        <div className="user-info-group">
                            <AccountCircleRounded className="info-icon" />
                            <Typography variant="body1">{userInfo.fullname} </Typography>
                        </div>
                        <span className="dash">-</span>
                        <div className="user-info-group">
                            <EmailRounded className="info-icon" />
                            <Typography variant="body1">{userInfo.email} </Typography>
                        </div>
                        <span className="dash">-</span>
                        <div className="user-info-group">
                            <DateRangeRounded className="info-icon" />
                            <Typography variant="body1">
                                {' '}
                                {dayjs(userInfo.createdAt).format('MM/YYYY')}{' '}
                            </Typography>
                        </div>
                    </div>

                    <div className="user-statistic">
                        <div className="user-statistic-box">
                            <EmojiEventsRounded />
                            <Typography variant="body1">{userInfo.cups} cups</Typography>
                        </div>
                        <div className="user-statistic-box">
                            <SportsEsportsRounded />
                            <Typography variant="body1">{userInfo.total} games</Typography>
                        </div>
                        <div className="user-statistic-box">
                            <MoodRounded />
                            <Typography variant="body1">{userInfo.wins} wins</Typography>
                        </div>
                        <div className="user-statistic-box">
                            <StarBorderRounded />
                            <Typography variant="body1">
                                {(userInfo.wins / userInfo.total).toFixed(2)} %
                            </Typography>
                        </div>
                    </div>

                    <History userInfo={userInfo} />
                </DialogContent>
            }
        </Dialog>
    );
};

export default Profile;
