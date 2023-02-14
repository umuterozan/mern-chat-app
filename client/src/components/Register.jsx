import { useState } from "react";
import { registerUser } from "../services";

export default function Register({ switchForm }) {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(formData).then((res) => {
            if (res.ok) {
                switchForm("login");
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="max-w-[500px] mx-auto mt-20 border-2 p-20 rounded">
            <div className="mb-10">
                <h1 className="text-center text-3xl">Register Page</h1>
            </div>

            <div className="mb-10">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="inline-block mb-2 text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name..."
                            onChange={handleChange}
                            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="inline-block mb-2 text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password..."
                            onChange={handleChange}
                            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="block w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>

            <div className="text-center">
                Already have an account?{" "}
                <button
                    className=" text-blue-600 hover:underline"
                    onClick={() => switchForm("login")}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
