import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import socket from '../../../commons/socket';
import { useAuthContext } from '../../../context/AuthContext';
import './styles.scss';

const RoomList = () => {
    const { register, handleSubmit, control, errors, setError, reset } = useForm({
        defaultValues: {
            password: '',
            time: '45',
            roomId: '',
        },
    });

    console.log(errors);

    const { authData } = useAuthContext();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [roomList, setRoomList] = useState([]);

    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openJoinForm, setOpenJoinForm] = useState(false);

    const columns = useMemo(
        () => [
            {
                name: 'RoomID',
                selector: 'roomId',
                sortable: true,
            },
            {
                name: 'Host',
                selector: 'hostname',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            },
            {
                name: 'Slot',
                selector: 'slot',
                sortable: true,
            },
            {
                name: 'Viewer',
                selector: 'viewer',
                sortable: true,
            },
        ],
        [],
    );

    useEffect(() => {
        socket.emit('roomList');

        socket.on('getRoomList', (roomList) => {
            setLoading(true);
            let updatedRoomList = [];
            for (let roomId in roomList) {
                updatedRoomList.push({
                    roomId,
                    hostname: roomList[roomId].host.username,
                    status: roomList[roomId].boardId ? 'Playing' : 'Waiting',
                    slot: roomList[roomId].guest.username ? '2/2' : '1/2',
                    viewer: roomList[roomId].viewers.length,
                });
            }
            console.log(updatedRoomList);
            setRoomList(updatedRoomList);
            setLoading(false);
        });

        socket.on('joinRoom', (roomId) => {
            console.log(roomId);
            history.push(`/room/${roomId}`);
        });

        socket.on('joinRoomError', (type) => {
            console.log(type);

            if (type === 'wrongRoomId') {
                setError('roomId', {
                    type,
                    message: "Cant't find room with this roomId. Please try again!",
                });
            } else {
                setError('password', {
                    type,
                    message: 'Wrong password. Please try again!',
                });
            }
        });
    }, []);

    const handleOpenCreateForm = () => {
        setOpenCreateForm(true);
    };

    const handleCloseCreateForm = () => {
        setOpenCreateForm(false);
        reset({
            password: '',
            time: '45',
            roomId: '',
        });
    };

    const handleSubmitCreateGame = (data) => {
        const config = {
            password: data.password ? data.password : null,
            time: data.time,
        };
        socket.emit('createRoom', {
            cups: authData.userInfo.cups,
            config,
        });
        handleCloseCreateForm();
    };

    const handleOpenJoinForm = () => {
        setOpenJoinForm(true);
    };

    const handleCloseJoinForm = () => {
        setOpenJoinForm(false);
    };

    const handleSubmitJoinGame = (data) => {
        socket.emit('joinRoom', {
            roomId: data.roomId,
            password: data.password,
            cups: authData.userInfo.cups,
        });
        // handleCloseJoinForm();
    };

    return (
        <div className="room-list">
            <Typography variant="h2">Room List</Typography>
            <div className="btn-group">
                <Button onClick={handleOpenCreateForm} variant="contained" color="primary">
                    Create
                </Button>
                <Button onClick={handleOpenJoinForm} variant="contained" color="primary">
                    Join
                </Button>
            </div>

            <div className="content">
                <DataTable columns={columns} data={roomList} progressPending={loading} />
            </div>

            <Dialog
                fullWidth={true}
                open={openCreateForm}
                onClose={handleCloseCreateForm}
                aria-labelledby="create-game-form"
            >
                <DialogTitle id="create-game-form">Create game</DialogTitle>
                <DialogContent>
                    <InputLabel>Password (Optional)</InputLabel>
                    <TextField
                        margin="dense"
                        name="password"
                        inputRef={register}
                        autoComplete="off"
                    />
                    <InputLabel>Time</InputLabel>
                    <Controller
                        control={control}
                        name="time"
                        render={({ onChange, onBlur, value }) => (
                            <Select
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                defaultValue="45"
                            >
                                <MenuItem value="15">15</MenuItem>
                                <MenuItem value="30">30</MenuItem>
                                <MenuItem value="45">45</MenuItem>
                                <MenuItem value="60">60</MenuItem>
                                <MenuItem value="75">75</MenuItem>
                                <MenuItem value="90">90</MenuItem>
                            </Select>
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateForm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(handleSubmitCreateGame)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                open={openJoinForm}
                onClose={handleCloseJoinForm}
                aria-labelledby="join-game-form"
            >
                <DialogTitle id="join-game-form">Join game</DialogTitle>
                <DialogContent>
                    <InputLabel>RoomID</InputLabel>
                    <TextField
                        margin="dense"
                        name="roomId"
                        inputRef={register}
                        autoComplete="off"
                    />
                    <InputLabel>Password</InputLabel>
                    <TextField
                        margin="dense"
                        name="password"
                        inputRef={register}
                        autoComplete="off"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseJoinForm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(handleSubmitJoinGame)} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RoomList;
