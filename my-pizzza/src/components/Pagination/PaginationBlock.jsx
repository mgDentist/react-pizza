import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';

import styles from './PaginationBlock.module.scss'

const PaginationBlock = ({ onChangePage, totalCount = 0, limit = 6, currentPage = 1 }) => {
    // Вычисляем общее количество страниц
    const pageCount = Math.ceil(totalCount / limit);

    // Храним текущую страницу в состоянии (для ReactPaginate нужен нулевой индекс)
    const [selected, setSelected] = useState(currentPage - 1);

    // Обновляем выбранную страницу при изменении currentPage извне
    useEffect(() => {
        setSelected(currentPage - 1);
    }, [currentPage]);

    console.log('Pagination info:', { totalCount, limit, pageCount, currentPage });

    // Не показываем пагинацию, если страница только одна
    if (pageCount <= 1) {
        return null;
    }

    // Обработчик изменения страницы
    const handlePageChange = (data) => {
        setSelected(data.selected);
        onChangePage(data.selected + 1);
    };

    return (
        <div className={styles.pagination_container}>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={handlePageChange}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                forcePage={selected}
                disabledClassName={styles.disabled}
                previousClassName={selected === 0 ? styles.disabled : ''}
                nextClassName={selected === pageCount - 1 ? styles.disabled : ''}
            />
        </div>
    );
};

export default PaginationBlock;