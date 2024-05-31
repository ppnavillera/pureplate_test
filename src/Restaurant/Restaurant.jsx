// import React from "react";
import axios from "axios";
import styles from "./Restaurant.module.css"; // CSS 모듈 불러오기
import RestaurantInfo from "./RestaurantInfo";
import Review from "./Review";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import bookmarkIconGray from "../assets/bookmarkGray.svg";
import bookmarkIconYellow from "../assets/bookmarkYellow.svg";

function Restaurant({ id, closeModal }) {
  const { isLoggedIn, userToken, bookmarks, bookmarkGet, URL } = useAuth();

  let restId = null;
  if (id != 0) {
    restId = id;
  }

  const [reviews, setReviews] = useState([]);

  const [RestInfo, SetRestInfo] = useState({
    id: "",
    name: "",
    rating: "",
    reviewcount: "",
    address: "",
    phone: "",
    photo: "",
  });
  const [ReviewInfo, SetReviewInfo] = useState({
    review_id: 0,
    user_id: 0,
    user_name: "",
    rating: 0,
    review_text: "",
    visit_date: "2024-05-26T00:00:00Z",
  });

  const calculateTimeAgo = (visit_date) => {
    const reviewDate = new Date(visit_date);

    const now = new Date();
    // 두 날짜의 UTC 시간 차이를 구합니다.
    const diffTime = Math.abs(now.getTime() - reviewDate.getTime());
    // 차이 값을 일 단위로 계산합니다.
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // 남은 시간 값을 시간 단위로 계산합니다.
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (diffDays == 1) return `${diffDays} day ago`;
    else return `${diffDays} days ago`;
  };

  const RestOn = async (restId) => {
    try {
      const response = await axios.get(`${URL}/api/restaurant/list`);
      response.data.data.forEach((element) => {
        if (element.Id == restId) {
          SetRestInfo((prevState) => ({
            ...prevState,
            id: element.Id,
            name: element.Name,
            rating: parseFloat(element.Rating).toFixed(1),
            reviewcount: element.ReviewCount,
            address: element.Address,
            phone: element.Phone,
            photo: element.Photo,
          }));
        }
      });
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
  const ReviewOn = async (name) => {
    try {
      // console.log(name);
      const response = await axios.get(`${URL}/api/review/view?name=${name}`);

      setReviews(response.data.reviews);
      const reviewData = response.data.reviews[0];
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
    if (id != 0) {
      RestOn(restId);
    }
  }, [restId]);
  useEffect(() => {
    if (RestInfo.name !== "") {
      ReviewOn(RestInfo.name);
    }
  }, [RestInfo.name]); // RestInfo.name이 변경될 때마다 ReviewOn 함수를 호출
  //

  //북마크

  // 북마크 상태를 관리하기 위한 useState 추가
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    bookmarks[RestInfo.id] ? setIsBookmarked(true) : setIsBookmarked(false);
  });

  // 북마크 상태를 토글하는 함수
  const toggleBookmark = async () => {
    // 북마크가 이미 설정되어 있는 경우, 북마크를 삭제합니다.
    if (isBookmarked) {
      try {
        const response = await axios.delete(
          `${URL}/api/favorite/delete/${RestInfo.name}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${userToken}`,
            },
          }
        );
        console.log(response.data);
        setIsBookmarked(false); // 북마크 상태를 업데이트합니다.
        bookmarkGet(userToken);
      } catch (error) {
        console.error(error.response ? error.response.data : error);
      }
    } else {
      // 북마크가 설정되어 있지 않은 경우, 북마크를 추가합니다.
      try {
        const response = await axios.post(
          `${URL}/api/favorite/add/${RestInfo.name}/`,
          null,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${userToken}`,
            },
          }
        );
        console.log(response.data);
        setIsBookmarked(true); // 북마크 상태를 업데이트합니다.
        bookmarkGet(userToken);
      } catch (error) {
        console.error(error.response ? error.response.data : error);
      }
    }
  };

  if (id != 0) {
    return (
      // <div className={styles.RestaurantContainer}>
      <>
        {/* <div className={styles.container} style={{}}> */}
        <div className={styles.container}>
          <div className={styles.header}>
            <RestaurantInfo RestInfo={RestInfo} />
            <img
              className={styles.bookmarkIcon}
              onClick={toggleBookmark}
              style={{
                cursor: "pointer",
                display: isLoggedIn ? "block" : "none",
              }}
              src={isBookmarked ? bookmarkIconYellow : bookmarkIconGray}
              alt="Bookmark"
            />
          </div>
          <div className={styles.body}>
            <div className={styles.review}>
              <div className={styles.review2}>Review</div>
              <div className={styles.line1}></div>
            </div>{" "}
            <div className={styles.reviewContainer}>
              {reviews.map((ReviewInfo) => (
                <Review
                  key={ReviewInfo.review_id} // 고유한 key 프로퍼티 추가
                  userName={ReviewInfo.user_name}
                  date={ReviewInfo.visit_date}
                  content={ReviewInfo.review_text}
                  rating={ReviewInfo.rating}
                  timeAgo={calculateTimeAgo(ReviewInfo.visit_date)}
                />
              ))}
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
}

export default Restaurant;
