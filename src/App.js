import React, {useEffect, createContext, useReducer} from 'react';
import {initialState, reducer} from './reducer';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Description from './components/Description/Description';
import Header from './components/Header/Header';
import Product from './components/Product/Product';



// Creating context for usage in global state management
export const Store = createContext();

const baseTheme = createMuiTheme();


const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Putting event listener on window so the shadow effect appears on header if user scrolls the page
    const header = document.querySelector('header');

    const headerShadow = () => {
      if (document.documentElement.scrollTop > 20) {
        header.style.boxShadow = "0 0 8px #e8e8e8";
      } else {
        header.style.boxShadow = "none";
      }
    }

    window.addEventListener('scroll', headerShadow);
  },[]);

  return (
      <div className="App">
        <Store.Provider value={{store: store, dispatch: dispatch}}>
          <ThemeProvider theme={baseTheme}>
            <Header />
            <Product />
            <Description />
          </ThemeProvider>
        </Store.Provider>
      </div>
  );
}

export default App;