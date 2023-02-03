import { GoPerson } from "react-icons/go";


export default function Conversation({ conversation }) {
    return (
        <div className="hover:bg-gray-100 cursor-pointer flex items-center gap-x-5 py-3 px-5">
            <div>
                <GoPerson size={32} />
            </div>
            <div>
                <div className="name">{conversation.members.filter((member) => member._id !== JSON.parse(localStorage.getItem("_user"))._id).map((member) => (member.name + " "))}</div>
                <div className="opacity-60 text-xs">
                    Bugün aktif
                </div>
            </div>
        </div>
    )
}