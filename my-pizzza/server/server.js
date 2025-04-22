const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors({
    exposedHeaders: ['X-Total-Count'] // Важно для работы пагинации
}));
app.use(express.json());

// Чтение данных из JSON файла
const readPizzasData = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '..', 'pizzas.json'), 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка чтения файла pizzas.json:', error);
        return { pizzas: [] };
    }
};

// Получение всех пицц с возможностью фильтрации и сортировки
app.get('/api/pizzas', (req, res) => {
    try {
        const {
            _page = 1,
            _limit = 6,
            _category,
            _sortBy = 'rating',
            _order = 'desc',
            _search
        } = req.query;

        const page = parseInt(_page);
        const limit = parseInt(_limit);

        // Получаем данные из файла
        const pizzasData = readPizzasData();
        let filteredPizzas = [...pizzasData.pizzas];

        // Фильтрация по категории
        if (_category) {
            const categoryId = parseInt(_category);
            filteredPizzas = filteredPizzas.filter(pizza => pizza.category === categoryId);
        }

        // Поиск по названию
        if (_search) {
            const searchLower = _search.toLowerCase();
            filteredPizzas = filteredPizzas.filter(pizza =>
                pizza.title.toLowerCase().includes(searchLower)
            );
        }

        // Сортировка
        filteredPizzas.sort((a, b) => {
            const sortField = _sortBy;
            if (_order === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        });

        // Пагинация
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPizzas = filteredPizzas.slice(startIndex, endIndex);

        // Устанавливаем общее количество записей в заголовке
        console.log('Total pizzas for pagination:', filteredPizzas.length);
        res.set('X-Total-Count', filteredPizzas.length.toString());
        res.set('Access-Control-Expose-Headers', 'X-Total-Count');
        res.json(paginatedPizzas);
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Получение пиццы по ID
app.get('/api/pizzas/:id', (req, res) => {
    try {
        const pizzaId = parseInt(req.params.id);
        const pizzasData = readPizzasData();
        const pizza = pizzasData.pizzas.find(p => p.id === pizzaId);

        if (!pizza) {
            return res.status(404).json({ message: 'Пицца не найдена' });
        }

        res.json(pizza);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
}); 