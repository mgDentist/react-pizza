import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import MainContent from './components/MainContent';
import Cart from './components/Cart';
import NoPage from './components/NoPage';

import '../src/scss/app.scss';

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route index element={<MainContent />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
