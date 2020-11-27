import React,{ useState, useEffect } from 'react';
import './styles/Chat.css';
import { Avatar, IconButton }  from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [roomImage, setRoomImage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        
        db.collection('messages').add({
            message: input,
            senderName: user.displayName,
            receiverName: roomName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput("");
    }

    useEffect(() => {
        if(roomId){
            db.collection('users').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('users').doc(roomId).onSnapshot(snapshot => (
                setRoomImage(snapshot.data().displayImage)
            ));

            db.collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={roomImage}/> 

               <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
               </div>

               <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
               </div>
            </div>

            <div className="chat__body">
                {
                    messages.filter((message) => {
                        return (message.senderName ===  user.displayName && message.receiverName === roomName) || (message.senderName ===  roomName && message.receiverName === user.displayName);
                    })
                    .map((message) => (
                        <p className={`chat__message ${message.senderName === user.displayName && "chat__receiver"}`}>
                            {message.message}
                            <span className="chat__timestamp">
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    ))
                }
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input placeholder="Type a message" type="text" value={input} onChange={e => setInput(e.target.value)} />
                    <button type="submit" onClick={sendMessage}>
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;
