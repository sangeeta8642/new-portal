import React from 'react'
import { useLocation } from 'react-router-dom'

const ViewArticle = () => {

  const location = useLocation()
  const article = location.state?.art

  const getTruncatedDescription = (description, wordLimit) => {
    const words = description?.split(" ");
    if (words?.length <= wordLimit) {
      return description;
    }
    return words?.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <main className='flex flex-col justify-center items-center  '>
      <p className='text-3xl font-semibold py-5'> {article.title}</p>
      <img src={article.banner} alt="" />
      <div className='w-[80%]'>
        <p className=' text-[18px] py-5' dangerouslySetInnerHTML={{
          __html: getTruncatedDescription(article.content, 50),
        }}>
          {/* {article.content} */}
        </p>
      </div>
      <div className='flex'>
        {article.tags.map((tag) => (
          <p>#{tag}</p>
        ))}
      </div>
    </main>
  )
}

export default ViewArticle