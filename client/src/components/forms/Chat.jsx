import { GoPerson } from "react-icons/go";

export default function Chat({ currentChatBox }) {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="px-5 border-b-2 h-14 flex justify-between items-center">
                <div className="flex items-center gap-x-5">
                    <div className="avatar">
                        <GoPerson size={20} />
                    </div>
                    <div className="name">{currentChatBox.name}</div>
                </div>
                <div className="opacity-60 text-xs">Şu an aktif</div>
            </div>
            <div className="h-[556px] flex flex-col justify-end items-end px-5">
                <div className="bg-gray-100 max-w-[234px] py-5 text-center rounded-3xl mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </div>
                <div className="bg-gray-100 max-w-[234px] py-5 text-center rounded-3xl mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </div>
            </div>
            <div className="p-5 w-full">
                <form className="px-5 border-2 rounded-full h-11 flex justify-around items-center">
                    <input
                        type="text"
                        placeholder="Mesaj..."
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
