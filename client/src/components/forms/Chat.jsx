import { useEffect, useRef, useState } from "react";
import { GoPerson } from "react-icons/go";
import { getMessages, sendMessage } from "../../services";
import Message from "../Message";

export default function Chat({ currentChat }) {
    const [messages, setMessages] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef()

    useEffect(() => {
        getMessages(currentChat._id).then((res) => setMessages(res.messages))
    }, [currentChat])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            conversationId: currentChat._id,
            senderId: JSON.parse(localStorage.getItem("_user"))._id,
            content: newMessage
        }
        
        sendMessage(formData).then((res) => {
            setMessages([...messages, res.message])
            setNewMessage("")
        })
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="px-5 border-b-2 h-14 flex justify-between items-center">
                <div className="flex items-center gap-x-5">
                    <div className="avatar">
                        <GoPerson size={20} />
                    </div>
                    <div className="name">{currentChat.members.filter((member) => member._id !== JSON.parse(localStorage.getItem("_user"))._id).map((member) => (member.name + " "))}</div>
                </div>
                <div className="opacity-60 text-xs">Şu an aktif</div>
            </div>
            <div className="h-[556px] flex flex-col px-5 overflow-y-scroll">
                {messages && messages.map((m, key) => (
                    <div key={key} ref={scrollRef}>
                        <Message message={m} own={m.senderId === JSON.parse(localStorage.getItem("_user"))._id} />
                    </div>
                ))}
            </div>
            <div className="p-5 w-full">
                <form onSubmit={handleSubmit} className="px-5 border-2 rounded-full h-11 flex justify-around items-center">
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
