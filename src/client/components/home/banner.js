import Image from "next/image";
import React from "react";
import styles from "./Banner.module.css";

const BANNER_DATA = {
  highlight: "Discover, buy & sell Rare and Unique Arts",
  subhighlight:
    "We have you covered, if you are looking for amazing artworks from best, rising local artists",
};

const HomeBanner = (props) => {
  return (
    <div className={`row py-md-5 py-3 text-center ${styles.bannerContainer}`}>
      <div className="col-12 col-md-5 pb-4 pb-md-0 d-flex flex-column justify-content-center">
        <h1 className="mb-4">{BANNER_DATA.highlight}</h1>
        <p>{BANNER_DATA.subhighlight}</p>
        <div className="d-flex w-100 justify-content-between mt-2">
          <button className={styles.bidBtn}>
            <span>Place a Bid</span>
          </button>
          <button className={styles.discoverBtn}>
            <i className="bi bi-search me-2"></i>
            <span>Discover More</span>
          </button>
        </div>
      </div>
      <div className="col-12 col-md-7">
        <div className={styles.bannerImageContainer}>
          <img src="/images/banner_img.png"  />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
