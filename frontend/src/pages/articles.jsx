import React from 'react'
import { useGetAllArticles } from '../hooks/articles';
import  ArticleCard  from '../components/articlecard';
import Navbar from '../components/navbar';

const Articles = () => {
  const { articles } = useGetAllArticles()

  console.log("articles", articles);

  return (
    <main className='w-full'>
      <Navbar />
      <section className='w-full place-content-center place-items-center grid gap-6 p-10
       lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1'>

        {
          articles.length > 0 ? (
            articles.map((art) => (
              <ArticleCard article={art} />
            ))
          ) : <h2>You have no articles</h2>
        }
      </section>
    </main>
  )
}

export default Articles

