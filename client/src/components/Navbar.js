import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = ({ showSettings, setShowSettings }) => {
    return (
        <nav className='navbar'>
            <h1 className='mg-left-lg'>GPT Chat</h1>
            <div className='container mg-left mg-right-lg align'>
                <Link className='nav-links mg-right-lg' to='/'>
                    Home
                </Link>
                <Link className='nav-links mg-right-lg' to='/conversations'>
                    Conversations
                </Link>
                <FaCog className='icon pointer' onClick={() => setShowSettings(!showSettings)} />
            </div>
        </nav>
    );
};

export default Navbar;
