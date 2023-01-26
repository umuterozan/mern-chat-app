import { FaRegPaperPlane } from "react-icons/fa"
import { GoPerson } from "react-icons/go"
import { SlNote, SlLogout } from "react-icons/sl"

export default function Chat({ switchForm }) {

    const handleLogout = () => {
        localStorage.removeItem("_token")
        localStorage.removeItem("_user")
        switchForm("login")
    }

    return (
        <div className="py-5">
            <div className="w-[900px] h-[584px] mx-auto border-2 rounded flex">
                <div className="w-[350px] border-r-2 h-full">
                    <div className="border-b-2 h-14 flex justify-around items-center">
                        <button onClick={handleLogout}><SlLogout size={20} /></button>
                        <div className="font-medium">umuterozan</div>
                        <button><SlNote size={20} /></button>
                    </div>
                    <div>
                        <div className="hover:bg-gray-100 cursor-pointer flex items-center gap-x-5 mt-2 py-3 px-5">
                            <div>
                                <GoPerson size={32} />
                            </div>
                            <div>
                                <div className="name">admin123</div>
                                <div className="opacity-60 text-xs">Bugün aktif</div>
                            </div>
                        </div>                        
                        <div className="hover:bg-gray-100 cursor-pointer flex items-center gap-x-5 mt-2 py-3 px-5">
                            <div>
                                <GoPerson size={32} />
                            </div>
                            <div>
                                <div className="name">admin123</div>
                                <div className="opacity-60 text-xs">Bugün aktif</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="border-2 border-black p-8 rounded-full"><FaRegPaperPlane size={50} /></div>
                    <h1 className="mt-5 text-2xl">Mesajların</h1>
                    <p className="mt-2 opacity-60">Bir arkadaşına veya gruba gizli fotoğraflar ve mesajlar gönder.</p>
                    <button className="mt-5 px-5 py-2 bg-blue-600 text-white font-medium leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Mesaj Gönder</button>
                </div>
            </div>
        </div>
    )
}