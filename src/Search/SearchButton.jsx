import styles from "../SearchBar.module.css";
import searchStyles from "./Search.module.css";

function SearchButton({ onSubmit }) {
  return (
    <button className={styles.button} onClick={onSubmit}>
      <img
        className={searchStyles.search + " " + styles.searchInstance}
        src="/assets/search.svg"
        alt="Search"
      />
      {/* search.module.css랑 합치기 */}
    </button>
  );
}

export default SearchButton;
