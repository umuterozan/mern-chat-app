import { GoPerson } from "react-icons/go"
import { SlLogout, SlHome } from "react-icons/sl"
import Welcome from "./Welcome"
import Chat from "./forms/Chat"

export default function Inbox({ switchForm }) {

    const handleLogout = () => {
        localStorage.removeItem("_token")
        localStorage.removeItem("_user")
        switchForm("login")
    }

    return (
        <div className="py-5">
            <div className="max-w-[935px] h-[700px] mx-auto border-2 rounded flex">
                <div className="w-[350px] border-r-2 h-full">
                    <div className="border-b-2 h-14 flex justify-around items-center">
                        <button onClick={handleLogout}><SlLogout size={20} /></button>
                        <div className="font-medium">umuterozan</div>
                        <button><SlHome size={20} /></button>
                    </div>
                    <div className="h-[644px]">
                        <div className="hover:bg-gray-100 cursor-pointer flex items-center gap-x-5 py-3 px-5">
                            <div>
                                <GoPerson size={32} />
                            </div>
                            <div>
                                <div className="name">admin123</div>
                                <div className="opacity-60 text-xs">Bugün aktif</div>
                            </div>
                        </div>                        
                        <div className="hover:bg-gray-100 cursor-pointer flex items-center gap-x-5 py-3 px-5">
                            <div>
                                <GoPerson size={32} />
                            </div>
                            <div>
                                <div className="name">admin321</div>
                                <div className="opacity-60 text-xs">Bugün aktif</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* inbox welcome page! */}
                <Welcome />
                {/* <Chat /> */}
            </div>
        </div>
    )
}