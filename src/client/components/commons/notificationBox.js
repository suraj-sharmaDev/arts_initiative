import styles from "./notificationBox.module.css";

const NotificationBox = ({ title, subtitle, props }) => {
  return (
    <div style={{ height: "100vh", width: "100vw", paddingTop: 100 }}>
      <div className="container h-100 w-100 text-center d-flex flex-column align-items-center">
        <h2>Welcome to Protoflow sandbox</h2>
        <div className={styles.stylizedBox}>
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
        </div>
      </div>
    </div>
  );
};

export default NotificationBox;
