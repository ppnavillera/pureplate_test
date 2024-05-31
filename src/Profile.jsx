// import styles from "./Pureplate/Pureplate.module.css";
import styles from "./Profile.module.css";
import { ChevronDown } from "./ChevronDown/ChevronDown.jsx";
import { useEffect, useState } from "react";
// import SignC from "./Signin/SignC.jsx";
import Sign from "./Signin/Sign.jsx";
import { useAuth } from "./AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const { isLoggedIn, login, logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 메뉴 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      closeModal();
    }
  }, [isLoggedIn]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    if (isLoggedIn) {
      setDropdownOpen(!dropdownOpen);
    }
  };
  return (
    <div className={styles.profileContainer}>
      <div className={styles.dropdownContainer}>
        <button
          className={styles.profile}
          onClick={isLoggedIn ? toggleDropdown : openModal} // 로그인 상태에 따라 함수 변경
        >
          {!isLoggedIn ? (
            // <div className={styles.signin}>Sign-in</div>
            <span style={{ width: "100%" }}>Sign-in</span>
          ) : (
            <>
              {/* <img className={styles.profileImage} src="profile-image0.png" /> */}
              <div className={styles.jiwoo}>{user} </div>
              <ChevronDown
                className={styles.chevronDownInstance2}
              ></ChevronDown>
            </>
          )}
        </button>
        {dropdownOpen && ( // 드롭다운 메뉴 표시 조건
          <div
            className={`${styles.dropdownMenu} ${
              dropdownOpen
                ? styles["slide-fade-in-dropdown"]
                : styles["slide-fade-out-dropdown"]
            }`}
          >
            <ul>
              <li>My Page</li>
              <Link to="/Feedback">
                <li
                  onClick={() => {
                    console.log(user);
                  }}
                >
                  Feedback
                </li>
              </Link>
              <li
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                  navigate("/");
                }}
              >
                Logout
              </li>
              {/* 로그아웃 처리 */}
            </ul>
          </div>
        )}
        {/* <SignC isOpen={isModalOpen} close={closeModal} /> */}
        <Sign isOpen={isModalOpen} close={closeModal} />
      </div>
    </div>
  );
}

export default Profile;
