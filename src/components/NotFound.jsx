import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <div className="bg-white p-10 rounded-lg shadow-md max-w-md">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-lg text-gray-600 mt-4">Oops! The page you're looking for doesn't exist.</p>
                <a 
                    href="/" 
                    className="inline-block mt-6 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-all"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;