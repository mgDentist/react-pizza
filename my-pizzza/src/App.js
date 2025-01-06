import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Header from './Layout/Header';
import MainContent from './pages/MainContent/MainContent';
import Cart from './pages/Cart/Cart';
import NoPage from './pages/NoPage/NoPage';

import '../src/scss/app.scss';

function App() {
  const [categoryId, setPizzaActiveIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="wrapper">
      <Header inputValue={inputValue} setInputValue={setInputValue} categoryId={categoryId} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<MainContent inputValue={inputValue} categoryId={categoryId} setPizzaActiveIndex={setPizzaActiveIndex} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
