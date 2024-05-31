// import styles from "./Feedback.module.css"; // CSS 모듈 불러오기
import React, { useState } from "react";
import styles from "./RestaurantForm.module.css"; // CSS 모듈 import
import axios from "axios";
import { useAuth } from "../AuthContext";

function RestaurantForm() {
  const [restaurantName, setRestaurantName] = useState("");
  const [menuOptions, setMenuOptions] = useState({
    vegan: false,
    halal: false,
    gluten_free: false,
    lacto_free: false,
  });
  const [additionalComments, setAdditionalComments] = useState("");
  const { URL } = useAuth();

  const handleNameChange = (e) => {
    setRestaurantName(e.target.value);
  };

  const handleMenuChange = (e) => {
    const { name, checked } = e.target;
    setMenuOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleCommentsChange = (e) => {
    setAdditionalComments(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 폼 제출 로직
    const data = {
      restaurant_name: restaurantName,
      vegan: menuOptions.vegan,
      halal: menuOptions.halal,
      gluten_free: menuOptions.gluten_free,
      lacto_free: menuOptions.lacto_free,
      comments: additionalComments,
    };

    console.log(data);
    try {
      const response = await axios.post(`${URL}/api/feedback/submit/`, data);
      console.log(response.data);
      alert("submitted!");
      setRestaurantName("");
      setAdditionalComments("");
      setMenuOptions((currentOptions) => {
        const resetOptions = {};
        for (const option in currentOptions) {
          resetOptions[option] = false;
        }
        return resetOptions;
      });
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      // 오류 처리 로직을 여기에 작성하세요.
      // 예: 사용자에게 오류 메시지 표시하기 등
      alert("Wrong Restaurant Name");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formField}>
        <label htmlFor="restaurantName" className={styles.formLabel}>
          Restaurant Name:
        </label>
        <input
          type="text"
          id="restaurantName"
          value={restaurantName}
          onChange={handleNameChange}
          className={styles.input}
        />
      </div>
      <div className={styles.checkboxContainer}>
        <p>Menu Options:</p>
        {/* 체크박스 항목들 */}
        <label>
          <input
            type="checkbox"
            className={styles.checkbox}
            name="vegan"
            checked={menuOptions.vegan}
            onChange={handleMenuChange}
          />
          Vegan
        </label>
        <label>
          <input
            type="checkbox"
            className={styles.checkbox}
            name="halal"
            checked={menuOptions.halal}
            onChange={handleMenuChange}
          />
          Halal
        </label>
        <label>
          <input
            type="checkbox"
            className={styles.checkbox}
            name="gluten_free"
            checked={menuOptions.gluten_free}
            onChange={handleMenuChange}
          />
          Gluten-Free
        </label>
        <label>
          <input
            type="checkbox"
            className={styles.checkbox}
            name="lacto_free"
            checked={menuOptions.lacto_free}
            onChange={handleMenuChange}
          />
          Lacto-Free
        </label>
      </div>
      <div className={styles.formField}>
        <label htmlFor="additionalComments" className={styles.formLabel}>
          Additional Comments:
        </label>
        <textarea
          id="additionalComments"
          value={additionalComments}
          onChange={handleCommentsChange}
          className={`${styles.input} ${styles.textarea}`}
        />
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
}

export default RestaurantForm;
