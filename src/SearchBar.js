// import styles from "./Pureplate/Pureplate.module.css";
// import Search2 from "./Search2.jsx";
import SearchButton from "./Search/SearchButton.jsx";
import { useEffect, useState } from "react";

import styles from "./SearchBar.module.css";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";

function SearchBar() {
  // GET test
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");
  const [isHaveQuery, setIsHaveQuery] = useState(false);
  const [dropDownList, setDropDownList] = useState(restaurants);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const { URL } = useAuth();

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`${URL}/api/restaurant/list`);

      const restaurantNames = response.data.data.map((element) => element.Name);
      setRestaurants(restaurantNames);
    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했으나 상태 코드가 2xx 범위를 벗어났을 때
        console.error(
          "서버 응답 오류:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // 요청이 만들어졌으나 응답을 받지 못했을 때
        console.error(
          "서버로부터 응답이 없습니다. 네트워크 문제일 수 있습니다.",
          error.request
        );
      } else {
        // 요청 설정 중에 오류가 발생했을 때
        console.error("요청 설정 중 오류가 발생했습니다:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(query);
    if (query === "") {
      return;
    }
    setQuery("");
  };

  const onChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
    setIsHaveQuery(true);
  };

  //한글
  const showDropDownList = () => {
    if (query === "") {
      setIsHaveQuery(false);
      setDropDownList([]);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const choosenTextList = restaurants.filter((textItem) =>
        textItem.toLowerCase().includes(lowerCaseQuery)
      );
      setDropDownList(choosenTextList);
    }
  };
  const clickDropDownItem = (clickedItem) => {
    setQuery(clickedItem);
    setIsHaveQuery(false);
  };

  const handleDropDownKey = (event) => {
    if (isHaveQuery) {
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [query]);

  return (
    <div className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <input
          className={styles.search}
          type="text"
          name="search"
          id="searchInput"
          placeholder="Search"
          onChange={onChange}
          onKeyUp={handleDropDownKey}
          value={query}
          autoComplete="off"
        />

        {isHaveQuery && (
          <ul className={styles.dropDownBox}>
            {dropDownList.length === 0 && (
              <li className={styles.dropDownItem}>해당하는 단어가 없습니다</li>
            )}
            {dropDownList.map((dropDownItem, dropDownIndex) => (
              <li
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={`${styles.dropDownItem} ${
                  dropDownItemIndex === dropDownIndex ? styles.selected : ""
                }`}
              >
                <img
                  className={styles.union}
                  src="searchIcon.svg"
                  alt="search"
                />
                <div className={styles.searchHistory}>
                  <span className={styles.recentSearch12}>{dropDownItem}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </form>
      <SearchButton onSubmit={onSubmit} />
    </div>
  );
}

export default SearchBar;
