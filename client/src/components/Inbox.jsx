import { GoPerson } from "react-icons/go";
import { SlLogout, SlHome } from "react-icons/sl";
import Welcome from "./Welcome";
import Chat from "./forms/Chat";
import { useState } from "react";
import { getChats } from "../services";
import { useEffect } from "react";

export default function Inbox({ switchForm }) {
    const [currentChatBox, setChatBox] = useState(false);
    const [chats, setChats] = useState(false)

    useEffect(() => {
        getChats(JSON.parse(localStorage.getItem("_user"))._id).then((res) => setChats(res?.chat))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("_token");
        localStorage.removeItem("_user");
        switchForm("login");
        window.location.reload()
    };

    return (
        <div className="py-5">
            <div className="max-w-[935px] h-[700px] mx-auto border-2 rounded flex">
                <div className="w-[350px] border-r-2 h-full">
                    <div className="border-b-2 h-14 flex justify-around items-center">
                        <button onClick={handleLogout}>
                            <SlLogout size={20} />
                        </button>
                        <div className="font-medium">umuterozan</div>
                        <button>
                            <SlHome size={20} />
                        </button>
                    </div>
                    <div className="h-[644px]">
                        {chats && chats.map((chat, key) => (
                            <div key={key} className="hover:bg-gray-100 cursor-pointer flex items-center gap-x-5 py-3 px-5">
                                <div>
                                    <GoPerson size={32} />
                                </div>
                                <div>
                                    <div className="name">{chat.members.filter((member) => member._id !== JSON.parse(localStorage.getItem("_user"))._id).map((member) => (member.name + " "))}</div>
                                    <div className="opacity-60 text-xs">
                                        Bugün aktif
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* inbox home or chatbox area */}
                {currentChatBox ? (
                    <Chat currentChatBox={currentChatBox} />
                ) : (
                    <Welcome setChatBox={setChatBox} />
                )}
            </div>
        </div>
    );
}
