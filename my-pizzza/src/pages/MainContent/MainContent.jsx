import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../App';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import SkeletonPizzas from '../../components/PizzaBlock/SkeletonPizzas';
import PaginationBlock from '../../components/Pagination/PaginationBlock';
import PizzaNotFound from '../../components/PizzaNotFound/PizzaNotFound';

const MainContent = () => {
    const [pizzasList, setPizzasList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortItemIndex, setSortItemIndex] = useState({ name: 'рейтингу', sortType: 'rating' });
    const [pageNumber, setPageNumber] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const { inputValue, categoryId, setPizzaActiveIndex } = useContext(AppContext);

    const skeletonFakeArray = [...new Array(6)];

    const order = sortItemIndex.sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortItemIndex.sortType.replace('-', '');
    const category = categoryId > 0 ? `&_category=${categoryId}` : '';
    const search = inputValue ? `&_search=${inputValue}` : '';

    const LIMIT_PIZZAS_ON_PAGE = 6;

    const URLPizzas = `http://localhost:3002/api/pizzas?_page=${pageNumber}&_limit=${LIMIT_PIZZAS_ON_PAGE}${category}&_sortBy=${sortBy}&_order=${order}${search}`;

    // Сбрасываем страницу при изменении категории или поиска
    useEffect(() => {
        setPageNumber(1);
    }, [categoryId, inputValue]);

    useEffect(() => {
        setIsLoading(true);
        fetch(URLPizzas)
            .then((res) => {
                // Получаем общее количество пицц для пагинации
                const totalCountHeader = res.headers.get('X-Total-Count');
                if (totalCountHeader) {
                    setTotalCount(parseInt(totalCountHeader));
                }
                return res.json();
            })
            .then((pizzasArr) => {
                setPizzasList(Array.isArray(pizzasArr) ? pizzasArr : []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching pizzas:', error);
                setIsLoading(false);
            });

    }, [sortItemIndex, categoryId, inputValue, pageNumber, URLPizzas]);

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
                        (pizzasList.length > 0
                            ?
                            pizzasList.map((pizzaObj) => (
                                <PizzaBlock
                                    key={pizzaObj.id}
                                    {...pizzaObj}
                                />
                            ))
                            :
                            <PizzaNotFound />
                        )
                }
            </div>
            <PaginationBlock
                onChangePage={(number) => setPageNumber(number)}
                totalCount={totalCount}
                limit={LIMIT_PIZZAS_ON_PAGE}
                currentPage={pageNumber}
            />
        </>
    )
};

export default MainContent;