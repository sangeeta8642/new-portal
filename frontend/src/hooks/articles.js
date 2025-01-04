import { useState, useEffect } from "react";
import axios from "axios";

export const useGetAllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/article`,
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

    fetchAllArticles();
  }, []);

  return { articles, loading, error };
};
