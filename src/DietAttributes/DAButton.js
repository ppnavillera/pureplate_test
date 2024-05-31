import { useEffect, useState } from "react";
import styles from "./DietAttributes.module.css";

function Button({ attribute, selected = false }) {
  const [toggleOn, setToggleOn] = useState(selected);
  const onClick = () => {
    setToggleOn(!toggleOn);
  };
  const className = `${
    toggleOn
      ? styles.attributesButtonSelectedTrue
      : styles.attributesButtonSelectedFalse
  } ${styles.distance}`;

  return (
    <button className={className} onClick={onClick}>
      {attribute}
    </button>
  );
}

export default Button;
