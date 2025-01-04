import { useState, useEffect } from "react";
import axios from "axios";

export const useArticlesOfAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/article/get/admin`,
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

    fetchArticles();
  }, []);

  return { articles, loading, error };
};
