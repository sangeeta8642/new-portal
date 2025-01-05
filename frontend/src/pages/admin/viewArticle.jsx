import React from 'react'
import { useLocation } from 'react-router-dom'

const ViewArticle = () => {

  const location = useLocation()
  const article = location.state?.art

  return (
    <main className='flex flex-col justify-center items-center  '>
      <p className='text-3xl font-semibold py-5'> {article.title}</p>
      <img src={article.banner} alt="" />
      <div className='w-[80%]'>
        <p className=' text-[18px] py-5'>
          {article.content}
        </p>
      </div>
      <div className='flex'>
        {article.tags.map((tag)=>(
          <p>#{tag}</p>
        ))}
      </div>
    </main>
  )
}

export default ViewArticle