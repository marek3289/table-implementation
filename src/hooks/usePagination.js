import { useState, useEffect } from 'react';

const usePagination = (items, currentPage, postPerPage = 30) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setItemList([]);

    const subscribe = items.map((item, i) => {
      if (
        i + 1 <= currentPage * postPerPage &&
        i + 1 > currentPage * postPerPage - postPerPage
      ) {
        setItemList((prevState) => [...prevState, item]);
      }
      return null;
    });

    return () => subscribe;
  }, [items, currentPage, postPerPage]);

  return { itemList };
};

export default usePagination;
