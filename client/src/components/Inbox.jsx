import { useContext } from "react";
import { Context } from "../context/UserContext";
import { SlLogout, SlHome } from "react-icons/sl";
import Welcome from "./Welcome";
import Chat from "./Chat";
import { useState } from "react";
import { getConversations } from "../services";
import { useEffect } from "react";
import Conversation from "./Conversation";
import { handleLogout } from "../helpers";

export default function Inbox() {
    const { _user, _refreshToken } = useContext(Context);
    const [conversations, setConversations] = useState(false);
    const [currentChat, setCurrentChat] = useState(false);

    useEffect(() => {
        getConversations(_user._id).then((res) =>
            setConversations(res?.conversation)
        );
    }, [_refreshToken, _user._id]);

    return (
        <div className="py-5">
            <div className="max-w-[935px] h-[700px] mx-auto border-2 rounded flex">
                <div className="w-[350px] border-r-2 h-full">
                    <div className="border-b-2 h-14 flex justify-around items-center">
                        <button onClick={handleLogout}>
                            <SlLogout size={20} />
                        </button>
                        <div className="font-medium">{_user.name}</div>
                        <button onClick={() => setCurrentChat(false)}>
                            <SlHome size={20} />
                        </button>
                    </div>
                    <div className="h-[644px] overflow-y-auto">
                        {conversations &&
                            conversations.map((c, key) => (
                                <div
                                    key={key}
                                    onClick={() => setCurrentChat(c)}
                                >
                                    <Conversation conversation={c} />
                                </div>
                            ))}
                    </div>
                </div>
                {/* inbox home or chatbox area */}
                {currentChat ? (
                    <Chat currentChat={currentChat} />
                ) : (
                    <Welcome setCurrentChat={setCurrentChat} />
                )}
            </div>
        </div>
    );
}
