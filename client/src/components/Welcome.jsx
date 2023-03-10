import { useContext } from "react";
import { Context } from "../context/UserContext";
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

export default function Welcome({ setCurrentChat }) {
    const { _user, _refreshToken } = useContext(Context);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ButtonIsDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        getUsers(currentPage, 6).then((res) => {
            setUsers(res.result);
            setButtonDisabled(!res.previous);
        });
    }, [currentPage, _refreshToken]);

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
            <button onClick={openModal} className="modal-btn">
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
                                .filter((user) => user._id !== _user._id)
                                .map((user, key) => (
                                    <div
                                        onClick={() =>
                                            setCurrentChat({
                                                _id: user._id,
                                                name: user.name,
                                            })
                                        }
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
