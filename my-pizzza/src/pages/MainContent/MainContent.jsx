import { useEffect, useState } from 'react';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import SkeletonPizzas from '../../components/PizzaBlock/SkeletonPizzas';
import PaginationBlock from '../../components/Pagination/PaginationBlock';

const MainContent = ({ inputValue, categoryId, setPizzaActiveIndex }) => {

    const [pizzasList, setPizzasList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortItemIndex, setSortItemIndex] = useState({ name: 'рейтингу', sortType: 'rating' });
    const [pageNumber, setPageNumber] = useState(1);

    const skeletonFakeArray = [...new Array(10)];

    const order = sortItemIndex.sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortItemIndex.sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = inputValue ? `&search=${inputValue}` : '';

    const LIMIT_PAGE = 4;

    const URLPizzas = `https://66df19f5de4426916ee39224.mockapi.io/pizzas?page=${pageNumber}&limit=${LIMIT_PAGE}&${category}&sortBy=${sortBy}&order=${order}${search}`;

    useEffect(() => {
        setIsLoading(true);
        fetch(URLPizzas)
            .then((res) => res.json())
            .then((pizzasArr) => {
                console.log('hui', pizzasArr)
                setPizzasList(pizzasArr);
                setIsLoading(false);
            });
    }, [sortItemIndex, categoryId, inputValue, pageNumber ,URLPizzas]);

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
            <PaginationBlock onChangePage={(number) => setPageNumber(number)}/>
        </>
    )
};

export default MainContent;