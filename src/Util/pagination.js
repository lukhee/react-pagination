import React from 'react'
import styles from '../App.module.css';

const Pagination = (props)=> {
    const { currentPage, total, perPage, callApi} = props
    let renderPageNumbers;

        const pageNumbers = [];
        if (total !== null) {
        for (let i = 1; i <= Math.ceil(total / perPage); i++) {
            pageNumbers.push(i);
        }
    }

        renderPageNumbers = pageNumbers.map(number => {
            let classes = currentPage === number ? styles.active : '';
            return (
                <span key={number} className = {classes} onClick={() => callApi(number)}>{number}</span>
            );
        })

    return (
        <div>
            <div className={styles.pagination}>
            <span onClick={() => callApi(1)}>&laquo;</span>
            {renderPageNumbers}
            <span onClick={() => callApi(1)}>&raquo;</span>
            </div>

        </div>
    )
}

export default Pagination