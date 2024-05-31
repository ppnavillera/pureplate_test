// import React from "react";
import styles from "./Restaurant.module.css"; // CSS 모듈 불러오기
import profilePic from "./review/div4.svg";
import star1 from "../assets/Star1.svg";

function Review({ userName, date, content, timeAgo, rating }) {
  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <img key={i} className={styles.stars} src={star1} alt="Star" />
      );
    }
    return stars;
  };

  return (
    <div className={styles.reviewItem}>
      <div className={styles.profile}>
        <div className={styles.profilePic}>
          {/* 프로필 사진 또는 사용자 아이콘 */}
          <img className={styles.userIcon} src={profilePic} alt="Profile" />
        </div>
        <div className={styles.starContainer}>{renderStars()}</div>
        <div className={styles.nameContainer}>
          <div className={styles.userName}>{userName}</div>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.dateInfo}>
          <div className={styles.date}>{date}</div>
          <div className={styles.ellipse2}></div>
          <div className={styles.dayBefore}>{timeAgo}</div>
        </div>
        <div className={styles.contentsContainer}>
          <div className={styles.reviewContents}>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default Review;
