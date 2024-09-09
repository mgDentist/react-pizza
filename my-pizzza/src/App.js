import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import SkeletonPizzas from './components/PizzaBlock/SkeletonPizzas';
import { useEffect, useState } from 'react';
import '../src/scss/app.scss';

function App() {
  const URLPizzas = 'https://66df19f5de4426916ee39224.mockapi.io/pizzas';

  const [pizzasList, setPizzasList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const skeletonFakeArray = [ ...new Array(10)];

  useEffect(() => {
    fetch(URLPizzas)
      .then((res) => res.json())
      .then((pizzasArr) => {
        setPizzasList(pizzasArr);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading
                ?
                skeletonFakeArray.map((_, i) => 
                  <SkeletonPizzas
                    className="pizza-block"
                    key={i}
                  />
                )
                :
                pizzasList.map((pizzaObj) => (
                  <PizzaBlock
                    key={pizzaObj.id}
                    {...pizzaObj}
                  />
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
