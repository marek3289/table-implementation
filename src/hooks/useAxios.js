import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (api) => {
  const [fetchedItems, setFetchedItems] = useState([]);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchItems = async () => {
      try {
        const { data } = await axios.get(api, { cancelToken: source.token });
        setFetchedItems(data);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        throw err;
      }
    };

    fetchItems();
    return () => source.cancel();
  }, [api]);

  return { fetchedItems };
};

export default useAxios;
