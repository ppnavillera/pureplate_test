import React from "react";
import styles from "./header.module.css"; 
import SearchBar from "../../../components/Search/SearchBar.js";
import Attributes from "../../../components/DietAttributes/DietAttributes.js";
import Profile from "../../../components/Profile/Profile.jsx";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.purePlateIcon} />
      <SearchBar />
      <Attributes />
      <Profile />
    </header>
  );
};

export default Header;
