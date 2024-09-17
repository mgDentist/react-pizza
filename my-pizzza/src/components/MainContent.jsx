import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock/PizzaBlock';
import SkeletonPizzas from './PizzaBlock/SkeletonPizzas';
import { useEffect, useState } from 'react';

const MainContent = () => {
    const URLPizzas = 'https://66df19f5de4426916ee39224.mockapi.io/pizzas';

    const [pizzasList, setPizzasList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const skeletonFakeArray = [...new Array(10)];

    useEffect(() => {
        fetch(URLPizzas)
            .then((res) => res.json())
            .then((pizzasArr) => {
                setPizzasList(pizzasArr);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
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
        </>
    )
};

export default MainContent;