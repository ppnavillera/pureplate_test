import styles from "./Feedback.module.css"; // CSS 모듈 불러오기
// import rectangle1850 from "./review/rectangle-1850.png";

// import iconPhoneTelephone0 from "./review/icon-phone-telephone0.svg";
import RestaurantForm from "./RestaurantForm";

function Feedback({ id, closeModal }) {
  return (
    <>
      {/* <div className={styles.container} style={{}}> */}
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.review}>
            {/* <div className={styles.review2}>Review</div> */}
            {/* <div className={styles.line1}></div> */}

            <RestaurantForm />
          </div>
        </div>
        <button onClick={closeModal} className={styles.closeButton}>
          Close
        </button>
      </div>
      {/* </div> */}
    </>
    // </div>
  );
}

export default Feedback;

// <div className={styles.header}>
// <div className={styles.restInfo}>
//   {/* <div className={styles.restPicture}>s
//     <img
//       className={styles.rectangle185}
//       src={rectangle1850}
//       alt="Restaurant"
//     />
//   </div> */}
//   <div className={styles.restDescription}>
//     <div className={styles.restName}>잘 빠진 메밀</div>
//     <div className={styles.rateContainer}>
//       <div className={styles.rateStar}>
//         <img className={styles.star} src={star0} alt="Star" />
//         <div className={styles.rate}>4.5</div>
//       </div>
//       <div className={styles.bar}></div>
//       <div className={styles.rateReview}>
//         <div className={styles.reviewNum}>48</div>
//         <div className={styles.reviews}>Reviews</div>
//       </div>
//     </div>
//     <div className={styles.restAddress}>
//       서울특별시 종로구 자하문로11길 4
//     </div>
//     {/* <div className={styles.call}>
//       <img
//         className={styles.iconPhoneTelephone}
//         src={iconPhoneTelephone0}
//         alt="Phone"
//       />
//       <div className={styles.restPhoneNum}>070-4142-1214</div>
//     </div> */}
//   </div>
// </div>
// </div>
