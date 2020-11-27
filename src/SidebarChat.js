import React,{ useEffect, useState } from 'react';
import './styles/SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, displayImage }) {
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    },[id]);

    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={displayImage}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat;
