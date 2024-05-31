import styles from "./MapPin.module.css";

export const MapPin = ({ className, ...props }) => {
  return (
    <div className={styles.mapPin + " " + className}>
      <img className={styles.shape} src="shape0.svg" />
      <div className={styles.one55K}>155K </div>
      <img className={styles.shape2} src="shape1.svg" />
      <div className={styles.one55K2}>155K </div>
    </div>
  );
};
