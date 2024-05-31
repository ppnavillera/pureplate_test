import styles from "./AttributesButtonSelectedTrue.module.css";

export const AttributesButtonSelectedTrue = ({
  text = "Distance",
  selected = "false",
  className,
  ...props
}) => {
  const variantsClassName = styles["selected-" + selected];

  return (
    <div
      className={
        styles.attributesButtonSelectedTrue +
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
