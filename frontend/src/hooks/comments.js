import { useState, useEffect } from "react";
import axios from "axios";

export const useGetAcceptedComments = (id) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedComments = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/comment/by/article`,
          { articleId: id },
          { withCredentials: true }
        );
        console.log("response", response.data.data);

        setComments(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAcceptedComments();
  }, []);

  return { comments, setComments, loading, error };
};

export const useGetAllComments = (articleId, status) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedComments = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/comment/pending`,
          { articleId, status },
          { withCredentials: true }
        );
        console.log("response", response.data.data);

        setComments(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAcceptedComments();
  }, []);

  return { comments, setComments, loading, error };
};
