import React from 'react'
import { useGetAllArticles } from '../hooks/articles';
import { ArticleCard } from '../components/articlecard';

const Articles = () => {
  const { articles } = useGetAllArticles()

  console.log("articles", articles);

  return (
    <main className='w-full h-[100dvh] place-content-center place-items-center grid grid-cols-3'>
      {
        articles.length > 0 ? (
          articles.map((art) => (
            <ArticleCard article={art} />
          ))
        ) : <h2>You have no articles</h2>
      }
    </main>
  )
}

export default Articles

