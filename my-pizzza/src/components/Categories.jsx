import React from 'react';

function Categories() {

    const [pizzaActiveIndex, setPizzaActiveIndex] = React.useState(0);

    const pizzasTypes = [
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ];

    const onClickPizzaCategory = (index) => {
        setPizzaActiveIndex(index);
    };

    return (
        <div class="categories">
            <ul>
                {pizzasTypes.map((value, index) => (
                    <li
                        key={index}
                        onClick={() => onClickPizzaCategory(index)}
                        className={pizzaActiveIndex === index ? 'active' : ''}
                    >{value}</li>
                ))
                }
            </ul>
        </div>
    );
};

export default Categories;