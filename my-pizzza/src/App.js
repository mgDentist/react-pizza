import { Route, Routes } from 'react-router-dom';

import Header from './Layout/Header';
import MainContent from './pages/MainContent/MainContent';
import Cart from './pages/Cart/Cart';
import NoPage from './pages/NoPage/NoPage';

import '../src/scss/app.scss';

function App() {

  return (
    <div className="wrapper">
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
    </div>
  );
}

export default App;
