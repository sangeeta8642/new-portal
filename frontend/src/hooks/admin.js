import { useState } from "react";
import axios from "axios";

export const useArticlesOfAdmin = () => {

  const [articalesListData, setarticalesListData] = useState([]);
  const [articalesLoading, setarticalesLoading] = useState(false);
  const [articalesCurrentPage, setarticalesCurrentPage] = useState(1);
  const [articalesTotalPages, setarticalesTotalPages] = useState(1);
  const [articalesLimit, setarticalesLimit] = useState();
  const [articalesTotalDocs, setarticalesTotalDocs] = useState();

  const FetcharticalesByPagination = async (page, limit, query = "") => {
    // if (!page || !limit || isNaN(page) || isNaN(limit)) {
    //   alert("Invalid pagination parameters.");
    //   return;
    // }
    try {
      setarticalesLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/article`,
        {
          params: {
            page,
            limit,
            query: query,
          },
        }
      );

      if (response?.data?.success) {
        setarticalesListData(response?.data?.data?.Articals);
        setarticalesCurrentPage(response?.data?.data?.currentPage);
        setarticalesTotalPages(response?.data?.data?.totalPages);
        setarticalesLimit(response?.data?.data?.limit);
        setarticalesTotalDocs(response?.data?.data?.totalDocs);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setarticalesLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) {
      toast.error("You are already on the first page.");
      return;
    }

    if (pageNumber > articalesTotalPages) {
      toast.error(`Only Pages ${articalesTotalPages} Available`);
    } else {
      setarticalesCurrentPage(pageNumber);
    }
  };

  return {
    articalesListData,
    articalesLoading,
    articalesCurrentPage,
    articalesTotalPages,
    articalesLimit,
    articalesTotalDocs,
    handlePageChange,
    FetcharticalesByPagination,
  };
};
