import styles from './Search.module.scss';

const Search = () => {
    return (
        <div className={styles.searchContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 512 512" width="24">
                <title>Search icon</title>
                <path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" x1="338.29" x2="448" y1="338.29" y2="448" />
            </svg>
            <input placeholder='Ищу пиццку...'></input>
        </div>
    );
};

export default Search;