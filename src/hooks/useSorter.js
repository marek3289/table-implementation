import { useState, useEffect } from 'react';

const useSorter = (itemList, activeCol, activeDir) => {
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    setSortedList([]);

    const copyItemList = [...itemList];
    const subscribe = copyItemList.sort((a, b) => {
      let comparison = 0;

      if (!activeDir) {
        return a.id - b.id;
      }

      if (a[activeCol] > b[activeCol]) {
        comparison = 1;
      } else if (a[activeCol] < b[activeCol]) {
        comparison = -1;
      }
      return activeDir === 'desc' ? comparison * -1 : comparison;
    });
    setSortedList(subscribe);

    return () => subscribe;
  }, [itemList, activeCol, activeDir]);

  return { sortedList };
};

export default useSorter;
