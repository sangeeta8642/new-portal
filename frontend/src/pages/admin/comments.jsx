import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { user } from "../../utils";
import axios from "axios";
import { useGetAllComments } from "../../hooks/comments";

const Comments = () => {
  const location = useLocation();
  const article = location.state?.art;
  const [comment, setComment] = useState("");
  const { comments } = useGetAllComments(article._id,"p");

  const handleStatusChange = async (commentId, status) => {
    try {
      let res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/comment/status`, { commentId, status }, { withCredentials: true })
      console.log("res", res);
      if (res.data.success) {
        alert(res.data.message)
      }

    } catch (error) {
      console.log(error);

    }
  }

  const handleSubmit = async () => {
    try {
      const data = { articleId: article._id, content: comment };
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/comment`,
        data,
        { withCredentials: true }
      );
      if (res.data.success) {
        // setComments((prevComments) => [...prevComments, res.data.data]);
        // setComment("");
        alert(res.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex lg:flex-row flex-col w-full lg:h-[100dvh] ">
        <section className="flex-1 bg-gray-50 py-2 px-2">
          <h3 className="lg:text-3xl text-2xl text-center lg:text-start font-semibold py-5">
            {article.title}
          </h3>
          <img src={article.banner} alt={article.title} />
          <p className="p-2">{article.content}</p>
          <p className="p-2 text-center text-xl">
            Published on:{" "}
            {new Date(article.createdAt).toLocaleString("en-US").split(",")[0]}
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {article.tags.map((tag, index) => (
              <p key={index} className="text-blue-800 cursor-pointer hover:underline">
                #{tag}
              </p>
            ))}
          </div>
        </section>
        <section className="lg:flex-1 w-full mx-auto py-5 gap-3 overflow-y-scroll">
          <h3 className="lg:mx-8 md:mx-8 mx-1 lg:text-xl">#Comments</h3>
          <div className="lg:mx-8 md:mx-8 mx-1">
            <input
              type="text"
              placeholder="Enter your comment"
              className="w-full px-5 py-3 border-2 border-black rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-red-500 my-2 px-5 py-1 text-white"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="flex justify-end" key={comment._id}>
                <div className="w-[90%] mx-auto border-b-2 border-gray-800 p-2 overflow-hidden">
                  <div className="flex justify-between ">
                    <div className="w-max flex gap-2">
                      <img
                        src={comment.user.profilePic}
                        alt={comment.user.name}
                        width={25}
                      />
                      <p className="text-sm capitalize">{comment.user.name}</p>
                    </div>
                    <p className="text-sm hidden lg:block md:block sm:block">
                      posted on :{" "}
                      {new Date(comment.createdAt).toLocaleString("en-US").split(",")[0]}
                    </p>
                    <p className="text-sm block lg:hidden md:hidden sm:hidden">
                      {new Date(comment.createdAt).toLocaleString("en-US").split(",")[0]}
                    </p>
                  </div>
                  <p>{comment.content}</p>
                </div>

                <div className="flex items-center justify-around">
                  <button className="text-green-700 text-xl" onClick={() => handleStatusChange(comment._id, "a")}>
                    <abbr title="Accept">
                      <FaCheck />
                    </abbr>
                  </button>
                  <button className="text-red-700 text-xl" onClick={() => handleStatusChange(comment._id, "r")}>
                    <abbr title="Reject">
                      <RxCross1 />
                    </abbr>
                  </button>
                </div>
              </div>
            ))
          ) : <p className="mx-8">No comments on this article yet</p>
          }
        </section>
      </main>
    </>
  );
};

export default Comments;
