import React, { useEffect, useState } from "react";
import { useArticlesOfAdmin } from "../../hooks/admin";
import ArticleCard from "../../components/articlecard";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Loader from "../../components/Loader";
import { VscEdit } from "react-icons/vsc";
import { IoChevronBack, IoChevronForwardOutline } from "react-icons/io5";
import { TbView360 } from "react-icons/tb";
import { FaComment, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { cat } from "../../components";


const MyArticles = () => {
    const {
        articalesListData,
        articalesLoading,
        articalesCurrentPage,
        articalesTotalPages,
        articalesLimit,
        articalesTotalDocs,
        handlePageChange,
        FetcharticalesByPagination,
    } = useArticlesOfAdmin();

    const handleDelete = async (id) => {
        try {
            let res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/article/${id}`, { withCredentials: true })
            console.log("res", res);
            if (res.data.success) {
                alert(res.data.message)
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        FetcharticalesByPagination(1, 10, "", "");
        console.log("articalesListData",articalesListData)
    }, []);

    useEffect(() => {
        FetcharticalesByPagination(articalesCurrentPage, articalesLimit, "", "");
    }, [articalesCurrentPage - 1 || articalesCurrentPage + 1]);

    const nav = useNavigate();



    const [QuerySeachData, SetQuerySeachData] = useState("");

    const HandleSearchQuery = (e) => {
        const searchValue = e.target.value;
        SetQuerySeachData(searchValue); // Update the search query state
        FetcharticalesByPagination(1, articalesLimit, QuerySeachData, "");
    };

    const HandleSearchQuery2 = (event) => {
        const selectedValue = event.target.value;
        console.log(`Selected category: ${selectedValue}`);
        FetcharticalesByPagination(1, articalesLimit, QuerySeachData, selectedValue);
    };


    return (
        <main className='w-full h-[100dvh]'>
            <Navbar />
            <div className='flex xl:flex-row lg:flex-row sm:flex-col flex-col'>
                <div className='lg:w-[75%] xl:w-[75%] w-[95%] border-2 border-black mx-5 my-2 mt-10 h-10 flex justify-between px-10'>
                    <input onChange={HandleSearchQuery} name='QuerySeachData' type="text" placeholder='Search the article...' className='outline-none h-full' />
                    {/* <button><FaSearch /></button> */}
                </div>
                <select onChange={HandleSearchQuery2} name="category" id="cat" className='h-10 lg:mt-10 w-[20%] text-center border-2 border-black mx-5 lg:mx-0 xl:mx-0'>
                    {
                        cat.map((c) => (
                            <option value={c}>{c}</option>
                        ))
                    }
                </select>
            </div>
            <div className='w-full h-max flex justify-end'>
                <button className='bg-blue-800 px-5 py-2 m-5 text-lg text-white font-semibold rounded-md'
                    onClick={() => nav('/admin/create')} >+ Add new</button>
            </div>
            <section className='w-full place-content-center place-items-center grid gap-6 p-10
       lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 grid-cols-1'>

                {articalesLoading ? (
                    <>
                        <Loader />
                    </>
                ) : articalesListData.length > 0 ? (
                    articalesListData.map((art) => (
                        <div className='flex flex-col gap-2'>
                            <ArticleCard article={art} />
                            <div className='w-full flex gap-2 justify-end px-4'>
                                <button onClick={() => nav('/admin/update',
                                    { state: { art } })}> <abbr title="Edit">
                                        <VscEdit className='size-6' />
                                    </abbr>
                                </button>
                                <button onClick={() => nav('/view',
                                    { state: { art } })}><abbr title="View">
                                        <TbView360 className='size-6' />
                                    </abbr>
                                </button>
                                <button onClick={() => nav('/admin/comments',
                                    { state: { art } })}><abbr title="see comments">
                                        <FaComment className='size-6' />
                                    </abbr></button>
                                <button onClick={() => handleDelete(art._id)}><abbr title="Delete">
                                    <FaTrash className='size-6' />
                                </abbr> </button>
                            </div>
                        </div>
                    ))
                ) : <h2>You have no articles</h2>
                }
            </section>
            <nav
                className="flex text-sm  flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 px-4 py-3"
                aria-label="Table navigation"
            >
                <span className="font-normal text-gray-500 dark:text-gray-400 flex gap-1 flex-row">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-dark">
                        {articalesListData?.length}
                    </span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-dark">
                        {articalesTotalDocs}
                    </span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                        <button
                            onClick={() => handlePageChange(articalesCurrentPage - 1)}
                            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <IoChevronBack />
                        </button>
                    </li>
                    <li>
                        <div className="flex items-center justify-center py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
                            {articalesCurrentPage + "-" + articalesTotalPages}
                        </div>
                    </li>

                    <li>
                        <button
                            onClick={() => handlePageChange(articalesCurrentPage + 1)}
                            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-50 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <IoChevronForwardOutline />
                        </button>
                    </li>
                </ul>
            </nav>
        </main>
    )
}

export default MyArticles


