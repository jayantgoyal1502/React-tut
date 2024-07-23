import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50'>
            <div className={`mx-auto w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-300`}>
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-semibold text-gray-900 mb-4">Sign in to your account</h2>
                <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-6'>
                    <div className='space-y-4'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
