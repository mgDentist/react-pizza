import style from './PizzaNotFound.module.scss';

const PizzaNotFound = () => {
    return (
        <div className={style.pizzaNotFoundWrapper}>
            <h4>
                Такой пиццы не найдено...
            </h4>
        </div>
    )
};

export default PizzaNotFound;