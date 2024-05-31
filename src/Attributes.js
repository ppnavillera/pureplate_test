import styles from "./Pureplate/Pureplate.module.css";
// import { AttributesButtonSelectedTrue } from "./AttributesButtonSelectedTrue/AttributesButtonSelectedTrue.jsx";
// import { AttributesButtonSelectedFalse } from "./AttributesButtonSelectedFalse/AttributesButtonSelectedFalse.jsx";
import Button from "./Button.js";
import { useAuth } from "./AuthContext.jsx";
import { useEffect } from "react";

function Attributes() {
  const { dietToggle, setDietToggle } = useAuth();
  const dietType = Object.keys(dietToggle);

  return (
    <div className={styles.attributes}>
      {/* <img className={styles.filterIcon} src="filter-icon0.svg" /> */}
      <Button attribute={dietType[0]} />
      <Button attribute={dietType[1]} />
      <Button attribute={dietType[2]} />
      <Button attribute={dietType[3]} />
    </div>
  );
}

export default Attributes;
