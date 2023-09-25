import { useEffect, useState, useCallback, useContext } from 'react';
import { closeNav, constructItemIdSlices, getAllItemResults, getItem, getItemIds, getOrder, getTotalPageCount } from '../../lib/utils';
import { v4 as uuidv4 } from "uuid";
import { PacmanLoader } from 'react-spinners';
import Item from '../Item/Item';
import { AppContext } from '../../contexts/AppContext';
import { IHackerNewsItem, IItemsProps, IItemsViewData } from '../../types/interfaces';
import Pagination from '../Pagination/Pagination';

const Items = (props: IItemsProps) => {
  const { endpoint } = props;

  const {
    isNavVisible,
    setIsNavVisible,
    isInitialDataLoading,
    setIsInitialDataLoading,
  } = useContext(AppContext);

  const [isSliceLoading, setIsSliceLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemIdSlices, setItemIdSlices] = useState<number[][]>([]);
  const [itemSlices, setItemSlices] = useState<IHackerNewsItem[][]>([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentViewData, setCurrentViewData] = useState<IItemsViewData>({
    prev: [],
    current: [],
    next: []
  });

  const getItemSlice = useCallback(async (ids: number[]) => {
    setIsSliceLoading(true);

    const items = getAllItemResults(ids.map(id => getItem(id)));

    setIsSliceLoading(false);

    return items;
  }, []);

  const getDataForView = useCallback((itemSlicesArr: IHackerNewsItem[][], pageNumber: number) => {
    setCurrentViewData((_: IItemsViewData) => {
      return {
        prev: itemSlicesArr[pageNumber - 2] || [],
        current: itemSlicesArr[pageNumber - 1] || [],
        next: itemSlicesArr[pageNumber] || [],
      }
    });
  }, []);

  const onSwitchPage = async (direction: string) => {
    const nextCurrentPageValue = direction === '<' ? currentPage - 1 : currentPage + 1;

    /**
     * since the app already has the data to render the requested page,
     * promptly set the data
     */
    getDataForView(itemSlices, nextCurrentPageValue);

    setCurrentPage((_: number) => {
      return nextCurrentPageValue;
    });

    // scroll to top / bottom
    if (direction === '>') {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }

    /**
     * Eager load next slice if there is any
     */
    if (itemSlices.length - 1 < nextCurrentPageValue && nextCurrentPageValue < totalPageCount) {
      const itemSlice = await getItemSlice(itemIdSlices[itemSlices.length]);

      setItemSlices((prevSlices: IHackerNewsItem[][]) => {
        const newSlices = [...prevSlices, itemSlice];
        getDataForView(newSlices, nextCurrentPageValue);
        return newSlices;
      });
    }
  }

  const init = useCallback(async () => {
    setCurrentPage(1);
    setIsInitialDataLoading(true);

    // get item IDs
    const ids = await getItemIds(endpoint);

    // split item IDs into 30 item slices
    const slices = constructItemIdSlices(ids);
    setItemIdSlices(slices);

    // get total page count
    const totalPageCountTemp = getTotalPageCount(ids);
    setTotalPageCount(totalPageCountTemp);

    // retrieve first items
    const upperBound = totalPageCountTemp < 2 ? totalPageCountTemp : 2;

    for (let i = 0; i < upperBound; i++) {
      const itemSlice = await getItemSlice(slices[i]);

      setItemSlices((prevSlices: IHackerNewsItem[][]) => {
        return [...prevSlices, itemSlice];
      });

      /**
       * Set initial view
       */
      if (i === 0) {
        getDataForView([itemSlice], 1);
        setIsInitialDataLoading(false);
      }
    }
  }, [endpoint, getDataForView, getItemSlice, setIsInitialDataLoading]);

  useEffect(() => {
    init();
  }, [init, endpoint]);

  /**
   * Construct view data
   */
  let currentItems: IHackerNewsItem[] = [];
  if (typeof currentViewData?.current !== 'undefined' && currentViewData?.current?.length > 0 && !isInitialDataLoading) {
    currentItems = currentViewData.current;
  }

  return (
    <div className="page-container">
      <main>

        {/* PAGINATION PREVIOUS */}
        {
          currentPage === 1 ? null : (
            <Pagination direction="<" onSwitchPage={onSwitchPage}/>
          )
        }

        {/* MOBILE MENU BACKDROP */}
        {
          !isNavVisible ? null : (
            <div className="backdrop" onClick={() => closeNav(setIsNavVisible)}></div>
          )
        }

        {/* LOADING SPINNER */}
        {
          !isInitialDataLoading || currentItems.length > 0 ? null : (
            <div className="spinner">
              <PacmanLoader color="#649568" />
            </div>
          )
        }

        {/* HACKER NEWS ITEMS */}
        {
          currentItems.map((item: IHackerNewsItem, idx: number) => {
            return <Item key={uuidv4()} order={getOrder(currentPage, idx)} {...item} />;
          })
        }

        {/* PAGINATION NEXT */}
        {
          itemSlices[currentPage]?.length === 0 || currentPage >= totalPageCount || isSliceLoading ? null : (
            <Pagination direction=">" onSwitchPage={onSwitchPage}/>
          )
        }

      </main>

      {/* FOOTER */}
      <footer>
        {/* TODO: FOOTER TO BE IMPLEMENTED */}
      </footer>
    </div>
  );
}

export default Items;
