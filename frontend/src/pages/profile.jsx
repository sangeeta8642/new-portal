import React from 'react'
import { user } from '../utils'
import Navbar from '../components/navbar'

const Profile = () => {

    return (
        <>
            <Navbar />
            <main className='flex items-center justify-center my-10'>
                <section className="w-1/2">
                    <div>
                        <img src={user.profilePic} alt="" width={100} />
                        <p>Name : {user.name}</p>
                        <p>Email : {user.email}</p>
                    </div>
                    <button className='bg-blue-500 px-5 py-1 text-white'>Edit profile</button>
                    <button className='bg-yellow-500 px-5 py-1 text-white'>Change password</button>
                </section>
            </main>
        </>
    )
}

export default Profile