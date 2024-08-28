import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import '../src/scss/app.scss';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock name="Фу" price={450} />
            <PizzaBlock name="Не очень" price={150} />
            <PizzaBlock name="Это вообще как у всех" price={50} />
            <PizzaBlock name="Это то такое" price={999} />
            <PizzaBlock name="Липидная" price={355} />
            <PizzaBlock name="Белковая" price={300} />
            <PizzaBlock name="Углеводная" price={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
