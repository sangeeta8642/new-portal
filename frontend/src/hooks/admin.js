import { useEffect, useState } from "react";
import axios from "axios";

export const useArticlesOfAdmin = () => {
  const [articalesListData, setarticalesListData] = useState([]);
  const [articalesLoading, setarticalesLoading] = useState(false);
  const [articalesCurrentPage, setarticalesCurrentPage] = useState(1);
  const [articalesTotalPages, setarticalesTotalPages] = useState(1);
  const [articalesLimit, setarticalesLimit] = useState();
  const [articalesTotalDocs, setarticalesTotalDocs] = useState();

  const FetcharticalesByPagination = async (
    page,
    limit,
    query = "",
    categories = ""
  ) => {
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
            categories: categories,
          },
        }
      );

      if (response?.data?.success) {
        setarticalesListData(response?.data?.data?.Articles);
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

export const useGetFavories = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/favorites`,
          { withCredentials: true }
        );
        console.log("response", response.data.data);

        setArticles(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return { articles, loading, error };
};
