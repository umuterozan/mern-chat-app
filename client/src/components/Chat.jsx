import { useContext } from "react";
import { Context } from "../context/UserContext";
import { useEffect, useRef, useState } from "react";
import { GoPerson } from "react-icons/go";
import { getMessages, sendMessage } from "../services";
import Message from "./Message";
import { io } from "socket.io-client";

export default function Chat({ currentChat }) {
    const { _user } = useContext(Context);
    const [messages, setMessages] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();
    const socket = useRef(io("http://localhost:5000"));
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        socket.current = io("http://localhost:5000");

        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                content: data.content,
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.some(
                (member) => member._id === arrivalMessage.senderId
            ) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", _user._id);
        socket.current.on("getUsers", (users) => {
            console.log(users);
        });
    }, [_user._id]);

    useEffect(() => {
        getMessages(currentChat._id).then((res) => setMessages(res.messages));
    }, [currentChat]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            conversationId: currentChat._id,
            senderId: _user._id,
            content: newMessage,
        };

        const receiverId = currentChat.members.find(
            (member) => member._id !== _user._id
        )._id;

        socket.current.emit("sendMessage", {
            senderId: _user._id,
            receiverId,
            content: newMessage,
        });

        sendMessage(formData).then((res) => {
            setMessages([...messages, res.message]);
            setNewMessage("");
        });
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="px-5 border-b-2 h-14 flex justify-between items-center">
                <div className="flex items-center gap-x-5">
                    <div className="avatar">
                        <GoPerson size={20} />
                    </div>
                    <div className="name">
                        {currentChat.members
                            .filter((member) => member._id !== _user._id)
                            .map((member) => member.name + " ")}
                    </div>
                </div>
                <div className="opacity-60 text-xs">Şu an aktif</div>
            </div>
            <div className="h-[556px] flex flex-col px-5 overflow-y-auto">
                {messages &&
                    messages.map((m, key) => (
                        <div key={key} ref={scrollRef}>
                            <Message
                                message={m}
                                own={m.senderId === _user._id}
                            />
                        </div>
                    ))}
            </div>
            <div className="p-5 w-full">
                <form
                    onSubmit={handleSubmit}
                    className="px-5 border-2 rounded-full h-11 flex justify-around items-center"
                >
                    <input
                        type="text"
                        placeholder="Mesaj..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        className="w-full h-full outline-none"
                    />
                    <button
                        type="submit"
                        className="h-full text-blue-500 hover:text-blue-900"
                    >
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    );
}
