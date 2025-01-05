import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addFavorite, removeFavorite } from "../Redux/FvrtSlice";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
    //   const dispatch = useDispatch();
    //   const favorites = useSelector((state) => state.favorites.articles);
    //   const isFavorite = favorites.some(
    //     (favArticle) => favArticle.title === article.title
    //   );
    const user = localStorage.getItem("user");
    const nav = useNavigate();

    //   const handleFavorite = () => {
    //     if (user) {
    //       if (isFavorite) {
    //         dispatch(removeFavorite(article));
    //         Swal.fire({
    //           title: "Article removed from favorites",
    //           icon: "success",
    //           timer: 1000,
    //           toast: true,
    //           timerProgressBar: true,
    //           position: "top",
    //           showConfirmButton: false,
    //         });
    //       } else {
    //         dispatch(addFavorite(article));
    //         Swal.fire({
    //           title: "Article added to favorites",
    //           icon: "success",
    //           timer: 1000,
    //           toast: true,
    //           timerProgressBar: true,
    //           position: "top",
    //           showConfirmButton: false,
    //         });
    //       }
    //     } else {
    //       Swal.fire({
    //         title: "Please login before accessing this feature",
    //         timerProgressBar: true,
    //         toast: true,
    //         position: "top",
    //         showConfirmButton: true,
    //       }).then(() => {
    //         nav("/login");
    //       });
    //     }
    //   };

    const formattedDate = new Date(article.pubDate).toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    const getTruncatedDescription = (description, wordLimit) => {
        const words = description?.split(" ");
        if (words?.length <= wordLimit) {
            return description;
        }
        return words?.slice(0, wordLimit).join(" ") + "...";
    };

    return (
        <div className="relative border rounded-lg shadow-md overflow-hidden transition-all hover:scale-[1.03] cursor-default">
            {/* {article.image_url && ( */}
            <img
                src={
                    article?.banner ||
                    "data:image/png;base64,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"
                }
                alt={article.title}
                className="w-full h-[360px] object-cover"
            />
            {/* )} */}

            {/* Details section for large screens */}
            <div className="hidden lg:flex absolute inset-0 bg-black bg-opacity-50 flex-col justify-center items-center p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <h2 className="font-bold text-xl mb-2 text-white text-center capitalize">
                    {article.title}
                </h2>
                <p className="text-gray-300 text-center mb-2 font-semibold" dangerouslySetInnerHTML={{
                    __html: getTruncatedDescription(article.content, 50),
                }}>
                    {/* {getTruncatedDescription(article.content, 50)} */}
                </p>
                <div className="text-gray-200 text-sm text-center mb-4 flex gap-2">
                    Tags: {article.tags.map((tag) => (
                        <p>#{tag}</p>
                    ))}
                </div>
                <p className="text-white text-md font-semibold mb-4">
                    Published on: {new Date(article.createdAt).toLocaleString("en-US").split(',')[0]}
                </p>
                <div className="flex gap-20 w-full justify-evenly">
                    {/* <a
                        className="font-bold text-[1.15rem] hover:underline  text-white"
                        href={article.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read More
                    </a> */}
                    <button className="font-bold underline"
                    //   onClick={handleFavorite}
                    >
                        {/* {isFavorite ? (
              <svg
                stroke="currentColor"
                fill="coral"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            )} */}
                    </button>
                </div>
            </div>
            {/* Details section for medium and small screens */}
            <div className="p-4 lg:hidden bg-white h-full text-black text-center">
                <h2 className="font-bold text-xl mb-2 text-black text-center">
                    {article.title}
                </h2>
                <p className="text-gray-800 text-center mb-2 font-semibold" dangerouslySetInnerHTML={{
                    __html: getTruncatedDescription(article.content, 50),
                }}>
                    {/* {getTruncatedDescription(article.content, 50)} */}
                </p>
                <div className="text-gray-800 text-sm justify-center flex-wrap text-center mb-4 flex gap-2">
                    Tags: {article.tags.map((tag) => (
                        <p>#{tag}</p>
                    ))}
                </div>
                <p className="text-black text-md font-semibold mb-4">
                    Published on: {new Date(article.createdAt).toLocaleString("en-US").split(',')[0]}
                </p>
                <div className="flex gap-20 w-full justify-evenly">
                    {/* <a
                        className="font-bold text-[1.15rem] hover:underline text-red-600"
                        href={article.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read More
                    </a> */}
                    <button className="font-bold underline"
                    //   onClick={handleFavorite}
                    >
                        {/* {isFavorite ? (
              <svg
                stroke="currentColor"
                fill="coral"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
              </svg>
            ) : (
              <svg
                stroke="coral"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            )} */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
