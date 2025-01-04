import { useNavigate } from "react-router-dom"

export const ArticleCard = ({ article }) => {

    const nav = useNavigate()

    return (
        <din className="border-2 border-black rounded-md px-5 py-2">
            <div className='flex'>
                <img src={article.banner} alt="article.banner" width={50} height={50} />
                <p>{article.title}</p>
            </div>
            <div className='flex gap-2'>
                Categories:
                {
                    article.categories.map((cat) => (
                        <p>{cat}</p>
                    ))
                }
            </div>
            <div className='flex gap-2'>
                Tags:
                {
                    article.tags.map((cat) => (
                        <p>#{cat}</p>
                    ))
                }
            </div>
            <p className='flex gap-2'>
                Posted On :  {new Date(article.createdAt).toLocaleString("en-US")}
            </p>
            <button onClick={() => nav(`/update/${article.id}`)}>
                Edit
            </button>
        </din>
    )
}