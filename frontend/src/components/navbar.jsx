import React, { useState } from 'react';
import { admin_links, no_user, user_links } from '.';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Togglebtn from './Toggledarkmode';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const auth = localStorage.getItem("auth");
    const user = JSON.parse(auth);
    const nav = useNavigate();

    const handleLogOut = async () => {
        try {
            let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`);
            if (res.data.success) {
                localStorage.clear();
                alert(res.data.message);
                nav('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full h-14 bg-red-500 flex items-center justify-between px-6 md:px-10'>
            <h1 className='text-3xl text-white font-semibold'>
                India Now
            </h1>
            <button
                className='md:hidden text-white text-2xl'
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? '\u2715' : '\u2630'}
            </button>
            <div
                className={`flex flex-col md:flex-row gap-4 ${isMenuOpen ? 'absolute top-14 left-0 w-full bg-red-500 py-4' : 'hidden md:flex md:static'}`}>
                <div>
                    <Togglebtn />
                </div>


                {
                    !user ?
                        no_user.map((link) => (
                            <a className='capitalize text-white font-semibold text-lg px-4' href={link.path} key={link.path}>{link.title}</a>
                        )) :
                        user.role === "user" ?
                            <>
                                {user_links.map((link) => (
                                    <a className='capitalize text-white font-semibold text-lg px-4' href={link.path} key={link.path}>{link.title}</a>
                                ))}
                                <button onClick={handleLogOut} className='capitalize text-white font-semibold text-lg px-4'>logout</button>

                            </> :
                            <>
                                {admin_links.map((link) => (
                                    <a className='capitalize text-white font-semibold text-lg px-4' href={link.path} key={link.path}>{link.title}</a>
                                ))}
                                <button onClick={handleLogOut} className='capitalize text-white font-semibold text-lg px-4'>logout</button>
                            </>
                }

            </div>
        </div>
    );
};

export default Navbar;
