import { createContext, SetStateAction, Dispatch } from 'react';

interface IAppContext {
  isNavVisible: boolean;
  setIsNavVisible: Dispatch<SetStateAction<boolean>>;
  isInitialDataLoading: boolean;
  setIsInitialDataLoading: Dispatch<SetStateAction<boolean>>;
  headerText: string;
  setHeaderText: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<IAppContext>({
  isNavVisible: false,
  setIsNavVisible: () => {},
  isInitialDataLoading: false,
  setIsInitialDataLoading: () => {},
  headerText: 'best',
  setHeaderText: () => {},
});