import React from 'react';

function Categories({ PizzaActiveIndex, onClickCategory }) {

    // const [pizzaActiveIndex, setPizzaActiveIndex] = React.useState(0);

    const pizzasTypes = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ];

    // const onClickPizzaCategory = (index) => {
    //     setPizzaActiveIndex(index);
    // };

    return (
        <div className="categories">
            <ul>
                {pizzasTypes.map((value, i) => (
                    <li
                        key={i}
                        onClick={() => onClickCategory(i)}
                        className={PizzaActiveIndex === i ? 'active' : ''}
                    >{value}</li>
                ))
                }
            </ul>
        </div>
    );
};

export default Categories;