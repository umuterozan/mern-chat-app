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
                            className="form-input"
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
                            className="form-input"
                        />
                    </div>
                    <div>
                        <button type="submit" className="form-btn">
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
