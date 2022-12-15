import Carousel from "react-bootstrap/Carousel";
import styles from "./carousel.module.css";

const Items = [
  {
    img: "/images/asset_1.png",
    title: "Voice notes in Notion",
    subtitle: "Use speech-to-text and GPT-3 to record your thoughts in Notion",
  },
  {
    img: "/images/asset_1.png",
    title: "Voice notes in Notion",
    subtitle: "Use speech-to-text and GPT-3 to record your thoughts in Notion",
  },
];

function LoginCarousel() {
  return (
    <Carousel
      className={styles.carouselContainer}
      controls={false}
      fade={true}
      indicators={true}
    >
      {Items.map((i, idx) => {
        return (
          <Carousel.Item key={idx.toString()}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                className={styles.carouselImg}
                src={"/images/asset_1.png"}
                alt={`Login slide image ${idx + 1}`}
              />
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <h3>{i.title}</h3>
                <p>{i.subtitle}</p>
              </div>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default LoginCarousel;
