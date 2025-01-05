import React from 'react'
import { admin_links, no_user, user_links } from '.'
import { user } from '../utils'

const Navbar = () => {
    return (
        <div className='w-full h-14 bg-red-500 flex items-center justify-between px-6'>
            <h1 className='text-3xl text-white font-semibold '>
                India Now
            </h1>
            <div className='flex gap-4'>{
                !user ?
                    (no_user.map((link) => (
                        <a className='capitalize text-white font-semibold text-lg' href={link.path} key={link.path}>{link.title}</a>
                    ))) :
                    user.role === "user" ?
                        (user_links.map((link) => (
                            <a className='capitalize text-white font-semibold text-lg' href={link.path} key={link.path}>{link.title}</a>
                        ))) : (admin_links.map((link) => (
                            <a className='capitalize text-white font-semibold text-lg' href={link.path} key={link.path}>{link.title}</a>
                        )))

            }</div>
        </div>
    )
}

export default Navbar