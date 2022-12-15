import styles from "./loader.module.css";

const Loader = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
