import { FaRegPaperPlane } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { GoPerson } from "react-icons/go";
import { TfiArrowCircleRight } from "react-icons/tfi";
import Modal from "react-modal";
import { useState } from "react";
import { getUsers } from "../services";
import { useEffect } from "react";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: 0,
    },
};

Modal.setAppElement("#root");

export default function Welcome() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ButtonIsDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        getUsers(currentPage, currentPage === 1 ? 6 : 5).then((res) => {
            setUsers(res.result);
            setButtonDisabled(!res.previous);
        });
    }, [currentPage]);

    const openModal = () => {
        setIsOpen(true);
    };

    const afterOpenModal = () => {
        setCurrentPage(1);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="border-2 border-black opacity-80 p-8 rounded-full">
                <FaRegPaperPlane size={50} />
            </div>
            <h1 className="mt-5 text-2xl">Mesajların</h1>
            <p className="mt-2 opacity-60">
                Bir arkadaşına veya gruba gizli fotoğraflar ve mesajlar gönder.
            </p>
            <button
                onClick={openModal}
                className="mt-5 px-5 py-2 bg-blue-600 text-white font-medium leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
                Mesaj Gönder
            </button>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="w-[400px]">
                    <div className="flex justify-between items-center border-b-2 px-5 py-2.5">
                        <button onClick={closeModal}>
                            <GrClose size={20} />
                        </button>
                        <h2 className="font-medium">Yeni Mesaj</h2>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={!ButtonIsDisabled}
                            className="text-blue-500"
                        >
                            İleri
                        </button>
                    </div>
                    <div className="userList">
                        {users &&
                            users
                                .filter(
                                    (user) =>
                                        user._id !==
                                        JSON.parse(
                                            localStorage.getItem("_user")
                                        )._id
                                )
                                .map((user, key) => (
                                    <div
                                        className="p-5 cursor-pointer flex items-center justify-between hover:bg-gray-100"
                                        key={key}
                                    >
                                        <div className="flex items-center gap-x-5">
                                            <div>
                                                <GoPerson />
                                            </div>
                                            <div>{user.name}</div>
                                        </div>
                                        <div>
                                            <TfiArrowCircleRight size={20} />
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
