import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./PreAuth.module.css";
import { PATH_NAMES } from "src/client/clientConfig/clientConstants";

const routings = [
  { title: "Features", path: "/" },
  { title: "Marketplace", path: "/marketplace" },
  { title: "Community", path: "/community" },
  { title: "Activity", path: "/activity" },
];

const PreAuthNavbar = ({ pathname, ...props }) => {
  const linkContainerRef = useRef(null);
  const fakeDivRef = useRef(null);

  const onClickMenuBtn = () => {
    toggleLinkContainer();
  };

  const toggleLinkContainer = () => {
    // first we check if linkContainer is in toggelable mode
    const isToggelable =
      window.getComputedStyle(linkContainerRef.current).position == "absolute";
    if (isToggelable) {
      const isLinkActive =
        window.getComputedStyle(linkContainerRef.current).display !== "none";
      linkContainerRef.current.style.display = isLinkActive ? "none" : "flex";

      const isFakeDivActive =
        window.getComputedStyle(fakeDivRef.current).display !== "none";
      fakeDivRef.current.style.display = isFakeDivActive ? "none" : "block";
    }
    return;
  };

  return (
    <div className={`container py-2`}>
      <nav className={`navbar ${styles.navContainer}`}>
        <span className={styles.brand}>Arted</span>
        <div className={styles.linkContainer} ref={linkContainerRef}>
          {routings.map((r, idx) => {
            const isActiveRoute = r.path == pathname;
            const activeClass = isActiveRoute ? styles.activeNavLink : "";
            return (
              <Link href={r.path} key={idx.toString()}>
                <span className={`${styles.navLink} ${activeClass}`}>{r.title}</span>
              </Link>
            );
          })}
        </div>
        <button className={styles.menuBtn} onClick={onClickMenuBtn}>
          <i className="bi bi-list"></i>
        </button>
        <div
          className={styles.fakeDivForToggleLinkContainer}
          ref={fakeDivRef}
          onClick={toggleLinkContainer}
        >
          {/* This is fake div to handle on click outside toggleLinkContainer */}
        </div>
      </nav>
    </div>
  );
};

export default PreAuthNavbar;
