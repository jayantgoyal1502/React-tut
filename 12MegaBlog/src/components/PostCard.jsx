import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
                <div className='w-full h-48 bg-gray-200 flex justify-center items-center'>
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title} 
                        className='object-cover w-full h-full rounded-t-lg' 
                    />
                </div>
                <div className='p-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
