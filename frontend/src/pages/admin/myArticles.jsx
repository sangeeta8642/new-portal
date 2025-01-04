import React from 'react'
import { useArticlesOfAdmin } from '../../hooks/admin';
import { ArticleCard } from '../../components/articlecard';

const MyArticles = () => {
    const { articles } = useArticlesOfAdmin()

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

export default MyArticles


