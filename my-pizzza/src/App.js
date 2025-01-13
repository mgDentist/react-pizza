import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';

import Header from './Layout/Header';
import MainContent from './pages/MainContent/MainContent';
import Cart from './pages/Cart/Cart';
import NoPage from './pages/NoPage/NoPage';

import '../src/scss/app.scss';

export const AppContext = createContext();

function App() {
  const [categoryId, setPizzaActiveIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ categoryId, setPizzaActiveIndex, inputValue, setInputValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' element={<MainContent />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NoPage />} />
            </Routes>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
