import styles from "./Restaurant.module.css"; // CSS 모듈 불러오기
// import rectangle1850 from "./review/rectangle-1850.png";
import star0 from "./review/star0.svg";
import iconPhoneTelephone0 from "./review/icon-phone-telephone0.svg";

function RestaurantInfo({ RestInfo }) {
  return (
    <div className={styles.restInfo}>
      <div className={styles.restPicture}>
        <img
          className={styles.rectangle185}
          // src={rectangle1850}
          src={RestInfo.photo}
          alt="Restaurant"
        />
      </div>
      <div className={styles.restDescription}>
        <div className={styles.restName}>{RestInfo.name}</div>
        <div className={styles.rateContainer}>
          <div className={styles.rateStar}>
            <img className={styles.star} src={star0} alt="Star" />
            <div className={styles.rate}>{RestInfo.rating}</div>
          </div>
          <div className={styles.bar}></div>
          <div className={styles.rateReview}>
            <div className={styles.reviewNum}>{RestInfo.reviewcount}</div>
            <div className={styles.reviews}>Reviews</div>
          </div>
        </div>
        <div className={styles.restAddress}>{RestInfo.address}</div>
        <div className={styles.call}>
          <img
            className={styles.iconPhoneTelephone}
            src={iconPhoneTelephone0}
            alt="Phone"
          />
          <div className={styles.restPhoneNum}>{RestInfo.phone}</div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantInfo;
