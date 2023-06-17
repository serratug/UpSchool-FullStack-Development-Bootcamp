import React, { useEffect, useState } from 'react';
import '../App.css';
import { User } from '../types/UserTypes.ts';
import { Message } from '../types/MessageTypes.ts';
import {HubConnectionBuilder} from "@microsoft/signalr";


interface ChatPageProps {
    userName: string;
}


const ChatPage: React.FC<ChatPageProps> = ({ userName }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [loggedIn, setLoggedIn] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        try {

            const connection = new HubConnectionBuilder()
                .withUrl(API_URL+ "/Hubs/ConnectedUserHub")
                .withAutomaticReconnect()
                .build();

            const startConnection = async () => {
                await connection.start();
            }

            startConnection();

            connection.on('userAdded', (user: User) => {
                setUsers([...users, user]);
            });

            const getConnectedUsers = async () => {
                const newUser = await connection.invoke('GetConnectedUsers')
                setUsers([...users, newUser]);
            }

            getConnectedUsers();


            connection.onclose(() => {
                console.log('SignalR bağlantısı kapandı');
            });
        } catch (error) {
            console.error('SignalR bağlantısı sırasında bir hata oluştu:', error);
        }

        addUser();

    }, []);

    const addUser = async () => {
        const currentUser = new User(new Date().getTime(), userName);

        setUsers([...users, currentUser]);

        try {
            const connection = new HubConnectionBuilder()
                .withUrl(API_URL + "/Hubs/ConnectedUserHub")
                .withAutomaticReconnect()
                .build();

            await connection.start();

            await connection.invoke('AddUserAsync', currentUser);
        }
        catch (error){
            console.error('SignalR bağlantısı sırasında bir hata oluştu:', error);
        }
    }



    const handleLogout = () => {
        setLoggedIn(false);
    };



    const handleMessageSend = () => {

        if (loggedIn &&messageInput.trim() !== '') {
            const newMessage: Message = {
                id: messages.length + 1,
                sender: userName,
                content: messageInput,
                timestamp: new Date().toISOString(),
            };

            setMessages([...messages, newMessage]);
            setMessageInput('');

            try {
                const connection = new HubConnectionBuilder()
                    .withUrl(API_URL + "/Hubs/ChatHub")
                    .withAutomaticReconnect()
                    .build();

                connection.start();

                connection.invoke('SendMessageAsync');
            }
            catch (error){
                console.error('SignalR bağlantısı sırasında bir hata oluştu:', error);
            }

        }

    };
    return (
        <div className="container">
            <div className="header">
                <h1>UpStorage Chat</h1>
                {loggedIn && (
                    <button className="leave-button" onClick={handleLogout}>Leave</button>
                )}
            </div>
            <div className="content">
                <div className="connected-users">
                    <h2>Connected Users</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="chat-history">
                    <h2>Chat History</h2>
                    <div className="messages">
                        {messages.map((message) => (
                            <div key={message.id} className="message">
                                <span>{message.sender}</span>
                                <span>{message.content}</span>
                                <span>{message.timestamp}</span>
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <button onClick={handleMessageSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
