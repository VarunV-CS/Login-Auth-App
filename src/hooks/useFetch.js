import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    api
      .get(url)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
        }
      })
      .catch(() => {
        if (isMounted) setError("Failed to fetch data");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;
