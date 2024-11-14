import React, { useState } from 'react';
import Sidebar from './elements/Sidebar/sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <button
                className={`fixed top-4 left-4 z-50 bg-orange-500 p-2 rounded-full text-white shadow-lg ${
                    isSidebarOpen ? "hidden" : ""
                }`}
                onClick={toggleSidebar}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>

            <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                <main className="container mx-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
