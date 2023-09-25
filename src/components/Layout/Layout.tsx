import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../Header/Header";
import { AppContext } from "../../contexts/AppContext";
import { INavItemProps } from "../../types/interfaces";

export const NAV_ITEMS: INavItemProps[] = [
  { text: 'best', path: '/' },
  { text: 'new', path: '/new' },
  { text: 'ask', path: '/ask' },
  { text: 'show', path: '/show' },
  { text: 'jobs', path: '/jobs' },
];

const Layout = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isInitialDataLoading, setIsInitialDataLoading] = useState(false);
  const [headerText, setHeaderText] = useState('best');

  const context = {
    isNavVisible,
    setIsNavVisible,
    isInitialDataLoading,
    setIsInitialDataLoading,
    headerText,
    setHeaderText,
  }

  return (
    <>
      <AppContext.Provider value={context}>
        <Header navItems={NAV_ITEMS}/>
        <Outlet />
      </AppContext.Provider>
    </>
  )
};

export default Layout;