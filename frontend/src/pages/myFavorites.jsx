import React from 'react'
// import { useGetAllArticles } from '../hooks/articles';
import ArticleCard from '../components/articlecard';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { TbView360 } from "react-icons/tb";
import { IoIosHeart } from "react-icons/io";
import { FaComment, FaTrash } from 'react-icons/fa6';
import axios from 'axios';
import { useGetFavories } from '../hooks/admin';

const MyFavorites = () => {
    const { articles } = useGetFavories()
    const nav = useNavigate()

    const handleFavorites = async (articleId) => {
        try {
            let res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/favorites`,
                { articleId }, { withCredentials: true })
            console.log("res", res);
            if (res.data.success) {
                alert(res.data.message)
                nav('/favorites')
            }

        } catch (error) {
            // alert(error.response.data.message)
            alert(error.response.data.message)

        }
    }

    return (
        <main className='w-full'>
            <Navbar />
            <section className='w-full place-content-center place-items-center grid gap-6 p-10
       lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 grid-cols-1'>

                {
                    articles.length > 0 ? (
                        articles.map((art) => (
                            <div className='flex flex-col gap-2'>
                                <ArticleCard article={art} />
                                <div className='w-full flex gap-2 justify-end px-4'>
                                    <button onClick={() => nav('/view',
                                        { state: { art } })}> <abbr title="View">
                                            <TbView360 className='size-6' />
                                        </abbr></button>
                                    <button onClick={() => nav('/article/comments',
                                        { state: { art } })}> <abbr title="see comments">
                                            <FaComment className='size-6' />
                                        </abbr> </button>
                                    <button onClick={() => handleFavorites(art._id)}><abbr title="Remove">
                                        <FaTrash className='size-6' />
                                    </abbr> </button>
                                </div>
                            </div>
                        ))
                    ) : <h2>You have no articles</h2>
                }
            </section>
        </main>
    )
}

export default MyFavorites

