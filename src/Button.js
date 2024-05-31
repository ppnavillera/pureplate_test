import { useState } from "react";
import trueStyles from "./AttributesButtonSelectedTrue/AttributesButtonSelectedTrue.module.css";
import falseStyles from "./AttributesButtonSelectedFalse/AttributesButtonSelectedFalse.module.css";
import { useAuth } from "./AuthContext";
// import styles from "./Pureplate/Pureplate.module.css";

function Button({ attribute }) {
  const { dietToggle, setDietToggle } = useAuth();

  // const onClick = () => {
  //   setDietToggle(!dietToggle[`${attribute}`]);
  // };
  const onClick = () => {
    // dietToggle 객체를 스프레드 연산자로 복사
    const updatedDietToggle = { ...dietToggle };
    // 해당 attribute의 값을 반전
    updatedDietToggle[attribute] = !updatedDietToggle[attribute];
    // 상태 업데이트
    setDietToggle(updatedDietToggle);
  };

  // const className = `${
  //   !dietToggle
  //     ? trueStyles.attributesButtonSelectedTrue
  //     : falseStyles.attributesButtonSelectedFalse
  // } ${trueStyles.distance}`;

  const className = `${
    dietToggle[attribute]
      ? trueStyles.attributesButtonSelectedTrue
      : falseStyles.attributesButtonSelectedFalse
  } ${trueStyles.distance}`;

  return (
    <button className={className} onClick={onClick}>
      {attribute}
    </button>
  );
}

export default Button;
