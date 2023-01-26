import { FaRegPaperPlane } from "react-icons/fa"

export default function Welcome() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="border-2 border-black p-8 rounded-full">
                <FaRegPaperPlane size={50} />
            </div>
            <h1 className="mt-5 text-2xl">Mesajların</h1>
            <p className="mt-2 opacity-60">
                Bir arkadaşına veya gruba gizli fotoğraflar ve mesajlar gönder.
            </p>
            <button className="mt-5 px-5 py-2 bg-blue-600 text-white font-medium leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Mesaj Gönder
            </button>
        </div>
    );
}
