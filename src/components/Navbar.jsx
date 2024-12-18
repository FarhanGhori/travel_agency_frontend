import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/4174409.jpg';
const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between">
            <img src={logo} alt="Logo" className="h-10" />
                <h1 className="text-xl font-bold">Travel Agency</h1>
                <ul className="flex gap-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
