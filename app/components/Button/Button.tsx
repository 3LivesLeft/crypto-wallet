import { ReactElement } from "react";
import styles from "../../page.module.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps): ReactElement {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
