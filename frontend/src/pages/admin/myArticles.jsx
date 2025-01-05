import React from 'react'
import { useArticlesOfAdmin } from '../../hooks/admin';
import ArticleCard from '../../components/articlecard';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';

const MyArticles = () => {
    const { articles } = useArticlesOfAdmin()
    const nav = useNavigate()


    return (
        <main className='w-full h-[100dvh]'>
            <Navbar />
            <div className='w-full h-max flex justify-end'>
                <button className='bg-blue-800 px-5 py-2 m-5 text-lg text-white font-semibold rounded-md'
                    onClick={() => nav('/admin/create')} >+ Add new</button>
            </div>
            <section className='place-content-center place-items-center grid grid-cols-3 p-10 gap-6'>

                {
                    articles.length > 0 ? (
                        articles.map((art) => (
                            <div className='flex flex-col gap-2'>
                                <ArticleCard article={art} />
                                <div className='w-full flex gap-2 justify-end px-4'>
                                    <button onClick={() => nav('/admin/update',
                                        { state: { art } })}>E</button>
                                    <button onClick={() => nav('/admin/view',
                                        { state: { art } })}>V</button>
                                    <button>C</button>
                                    <button>D</button>
                                </div>
                            </div>
                        ))
                    ) : <h2>You have no articles</h2>
                }
            </section>
        </main>
    )
}

export default MyArticles


