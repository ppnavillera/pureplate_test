import styles from "./AttributesButtonSelectedFalse.module.css";

export const AttributesButtonSelectedFalse = ({
  text = "Distance",
  selected = "false",
  className,
  ...props
}) => {
  const variantsClassName = styles["selected-" + selected];

  return (
    <div
      className={
        styles.attributesButtonSelectedFalse +
        " " +
        className +
        " " +
        variantsClassName
      }
    >
      <div className={styles.distance}>{text} </div>
    </div>
  );
};
