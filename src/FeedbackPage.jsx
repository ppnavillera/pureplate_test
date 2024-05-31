import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pureplate/Pureplate.module.css";
import Feedback from "./Feedback/Feedback";

function FeedbackPage() {
  const [isFbModalOpen, setIsFbModalOpen] = useState(true);
  const navigate = useNavigate();
  const fbModalRef = useRef();

  const closeFbModal = () => {
    setIsFbModalOpen(false);
    navigate("/");
  };

  // // 모달 외부 클릭 감지
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (fbModalRef.current && !fbModalRef.current.contains(event.target)) {
  //       closeFbModal();
  //     }
  //   }
  //   // 이벤트 리스너 등록
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [fbModalRef]);

  return (
    <div>
      {isFbModalOpen && (
        <div
          ref={fbModalRef}
          className={styles.modalWrapper}
          // onClick={closeFbModal}
        >
          {/* <div onClick={(e) => e.stopPropagation()}> */}
          <Feedback closeModal={closeFbModal} />
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default FeedbackPage;
