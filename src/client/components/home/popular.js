import React from "react";
import styles from "./Popular.module.css";
import Data from "./dummyData/data.json";
import MultiItemCarousel from "../commons/multiItemCarousel";

const { POPULAR_DATA } = Data;

const HomePopular = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.listHeader}>
        <img src="/images/fire.png" />
        Popular
      </h1>
      <div className="row">
        <MultiItemCarousel>
          {POPULAR_DATA.map((d, idx) => {
            return (
              <div className="col-lg-3 col-4 pe-2" key={idx.toString()}>
                <div className={`${styles.sliderCard}`} key={idx.toString()}>
                  <div className={styles.artist}>
                    <img src={d.profile_img} />
                    <p>{d.artist_name}</p>
                  </div>
                  <div className={styles.artistWork}>
                    <img src={d.artwork.img} />
                    <div>
                      <h4>{d.artwork.name}</h4>
                      <p>{d.artwork.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </MultiItemCarousel>
      </div>
    </div>
  );
};

export default HomePopular;
