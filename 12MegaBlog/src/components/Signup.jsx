import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="mx-auto w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-200">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-semibold text-gray-900 mb-4">Sign up to create an account</h2>
                <p className="text-center text-sm text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-6'>
                    <div className='space-y-4'>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("email", {
                                required: "Email is required",
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
                                required: "Password is required",
                            })}
                        />
                        <Button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
