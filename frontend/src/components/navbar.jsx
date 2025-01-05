import React from 'react'
import { admin_links, no_user, user_links } from '.'
// import { user } from '../utils'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {
    const auth = localStorage.getItem("auth");

    const user = JSON.parse(auth);

    const nav = useNavigate()
    const handleLogOut = async () => {
        try {
            let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`)
            if (res.data.success) {
                localStorage.clear()
                alert(res.data.message)
                nav('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-full h-14 bg-red-500 flex items-center justify-between px-6'>
            <h1 className='text-3xl text-white font-semibold '>
                India Now
            </h1>
            <div className='flex gap-4'>{
                !user ?
                    (
                        no_user.map((link) => (
                            <a className='capitalize text-white font-semibold text-lg' href={link.path} key={link.path}>{link.title}</a>
                        ))
                    ) :
                    user.role === "user" ?
                        (
                            <>{

                                user_links.map((link) => (
                                    <a className='capitalize text-white font-semibold text-lg' href={link.path} key={link.path}>{link.title}</a>
                                ))
                            }
                                <button onClick={handleLogOut} className='capitalize text-white font-semibold text-lg'>logout</button></>
                        ) : (
                            <>{

                                admin_links.map((link) => (
                                    <a className='capitalize text-white font-semibold text-lg' href={link.path} key={link.path}>{link.title}</a>
                                ))
                            }
                                <button onClick={handleLogOut} className='capitalize text-white font-semibold text-lg'>logout</button></>
                        )

            }</div>
        </div>
    )
}

export default Navbar