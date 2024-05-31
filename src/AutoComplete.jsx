// AutoComplete.js
import React, { useEffect, useState } from "react";
import styles from "./AutoComplete.module.css"; // CSS 모듈 불러오기
// import Title from "../components/Title";

const wholeTextArray = [
  "apple",
  "banana",
  "coding",
  "javascript",
  "원티드",
  "프리온보딩",
  "프론트엔드",
];

const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [isHaveQuery, setIsHaveQuery] = useState(false);
  const [dropDownList, setDropDownList] = useState(wholeTextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const onChange = (event) => {
    setQuery(event.target.value);
    setIsHaveQuery(true);
  };
  const showDropDownList = () => {
    if (query === "") {
      setIsHaveQuery(false);
      setDropDownList([]);
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) =>
        textItem.includes(query)
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
    <div className={styles.wholeBox}>
      {/* <Title text="AutoComplete" /> */}
      <div className={`${styles.inputBox} ${isHaveQuery ? styles.active : ""}`}>
        <input
          type="text"
          value={query}
          onChange={onChange}
          onKeyUp={handleDropDownKey}
          className={styles.input}
        />
        <div className={styles.deleteButton} onClick={() => setQuery("")}>
          &times;
        </div>
      </div>
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
              {dropDownItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
