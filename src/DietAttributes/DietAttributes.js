import styles from "./DietAttributes.module.css";
import Button from "./DAButton.js";

const attributes = ["Vegan", "Halal", "Gluten-Free", "Lacto-Free"];

function DietAttributes() {
  return (
    <div className={styles.attributes}>
      <Button attribute={attributes[0]} selected={true} />
      <Button attribute={attributes[1]} selected={false} />
      <Button attribute={attributes[2]} selected={false} />
      <Button attribute={attributes[3]} selected={false} />
    </div>
  );
}

export default DietAttributes;

