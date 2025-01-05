import React from 'react'
import { useGetAllArticles } from '../hooks/articles';
import ArticleCard from '../components/articlecard';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { TbView360 } from "react-icons/tb";
import { IoIosHeart } from "react-icons/io";
import { FaComment, FaSearchengin } from 'react-icons/fa6';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { cat } from '../components';

const Articles = () => {
  const { articles } = useGetAllArticles()
  const nav = useNavigate()

  const handleFavorites = async (articleId) => {
    try {
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/favorites`,
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
      <div className='flex xl:flex-row lg:flex-row sm:flex-col flex-col'>
        <div className='lg:w-[75%] xl:w-[75%] w-[95%] border-2 border-black mx-5 my-2 mt-10 h-10 flex justify-between px-10'>
          <input type="text" placeholder='Search the article...' className='outline-none h-full' />
          <button><FaSearch /></button>
        </div>
        <select name="category" id="cat" className='h-10 lg:mt-10 w-[20%] text-center border-2 border-black mx-5 lg:mx-0 xl:mx-0'>
          {
            cat.map((c) => (
              <option value={c}>{c}</option>
            ))
          }
        </select>
      </div>
      <section className='w-full place-content-center place-items-center grid gap-6 p-10
       lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 grid-cols-1'>

        {
          articles.length > 0 ? (
            articles.map((art) => (
              <div className='flex flex-col gap-2'>
                <ArticleCard article={art} />
                <div className='w-full flex gap-2 justify-end px-4'>
                  <button onClick={() => handleFavorites(art._id)}>
                    <abbr title="Add to favorites">
                      <IoIosHeart className='size-6' />
                    </abbr>
                  </button>
                  <button onClick={() => nav('/view',
                    { state: { art } })}> <abbr title="View">
                      <TbView360 className='size-6' />
                    </abbr></button>
                  <button onClick={() => nav('/article/comments',
                    { state: { art } })}> <abbr title="see comments">
                      <FaComment className='size-6' />
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

export default Articles

