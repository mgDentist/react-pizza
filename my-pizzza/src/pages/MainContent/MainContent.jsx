import { useEffect, useState } from 'react';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import SkeletonPizzas from '../../components/PizzaBlock/SkeletonPizzas';

const MainContent = () => {

    const [pizzasList, setPizzasList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const skeletonFakeArray = [...new Array(10)];

    const [categoryId, setPizzaActiveIndex] = useState(0);
    const [sortItemIndex, setSortItemIndex] = useState({ name: 'популярности', sortType: 'rating' });

    const order = sortItemIndex.sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortItemIndex.sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    const URLPizzas = `https://66df19f5de4426916ee39224.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`;

    useEffect(() => {
        setIsLoading(true);
        fetch(URLPizzas)
            .then((res) => res.json())
            .then((pizzasArr) => {
                setPizzasList(pizzasArr);
                setIsLoading(false);
            });
    }, [sortItemIndex, categoryId, URLPizzas]);

    return (
        <>
            <div className="content__top">
                <Categories
                    PizzaActiveIndex={categoryId}
                    onClickCategory={(i) => (setPizzaActiveIndex(i))} />
                <Sort
                    SortItemIndex={sortItemIndex}
                    onClickSortItems={(i) => (setSortItemIndex(i))} />
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
        </>
    )
};

export default MainContent;