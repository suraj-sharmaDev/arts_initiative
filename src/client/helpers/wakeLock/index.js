import Router from "next/router";
import { webm, mp4 } from "./media";

// Detect iOS browsers < version 10
const oldIOS = () =>
  typeof navigator !== "undefined" &&
  parseFloat(
    (
      "" +
      (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(
        navigator.userAgent
      ) || [0, ""])[1]
    )
      .replace("undefined", "3_2")
      .replace("_", ".")
      .replace("_", "")
  ) < 10 &&
  !window.MSStream;

// Detect native Wake Lock API support (Samsung Browser supports it but cannot use it)
const nativeWakeLock = () =>
  "wakeLock" in navigator &&
  window.navigator.userAgent.indexOf("Samsung") === -1;

class WakeLockClass {
  constructor() {
    this.isEnabled = false;

    // to be used for chrome
    this.wakeLock = null;
    // to be used for old ios
    this.wakeTimer = null;
    // to be user for newer ios
    this.wakeVideo = null;

    Router.events.on("routeChangeStart", () => {
      // if route change has started
      // and wakelock is enabled then disable it
      if (this.isEnabled) {
        console.log("disabling wake lock as route changed");
        this.disable();
      }
    });
  }

  _addSourceToVideo(element, type, dataURI) {
    var source = document.createElement("source");
    source.src = dataURI;
    source.type = `video/${type}`;
    element.appendChild(source);
  }

  enable() {
    // if its already enabled
    if (this.isEnabled) {
      console.log("wakelock already enabled");
      return;
    }
    // for UA with native wakelock available
    if (nativeWakeLock()) {
      return navigator.wakeLock
        .request("screen")
        .then((wakeLock) => {
          this.wakeLock = wakeLock;
          this.isEnabled = true;
          this.wakeLock.addEventListener("release", () => {
            console.log("Wake Lock released.");
          });
        })
        .catch((err) => {
          this.isEnabled = false;
          console.error(`${err.name}, ${err.message}`);
          throw err;
        });
    }
    // for old IOS
    if (oldIOS()) {
      this.disable();
      console.warn(`
          NoSleep enabled for older iOS devices. This can interrupt
          active or long-running network requests from completing successfully.
          See https://github.com/richtr/NoSleep.js/issues/15 for more details.
        `);
      this.wakeTimer = window.setInterval(() => {
        if (!document.hidden) {
          window.location.href = window.location.href.split("#")[0];
          window.setTimeout(window.stop, 0);
        }
      }, 15000);
      this.isEnabled = true;
      return Promise.resolve();
    }

    // for newer iOS or others
    if (this.wakeVideo == null) {
      this.wakeVideo = document.createElement("video");
      this.wakeVideo.setAttribute("title", "Wake Video");
      this.wakeVideo.setAttribute("playsinline", "");
      this.wakeVideo.setAttribute("webkit-playsinline", "");
      this.wakeVideo.playbackRate = 0.1;

      this._addSourceToVideo(this.wakeVideo, "webm", webm);
      this._addSourceToVideo(this.wakeVideo, "mp4", mp4);

      // For iOS >15 video needs to be on the document to work as a wake lock
      Object.assign(this.wakeVideo.style, {
        position: "absolute",
        left: "-100%",
        top: "-100%",
      });

      document.querySelector("body").append(this.wakeVideo);

      this.wakeVideo.addEventListener("loadedmetadata", () => {
        if (this.wakeVideo.duration <= 1) {
          // webm source
          this.wakeVideo.setAttribute("loop", "");
        } else {
          // mp4 source
          this.wakeVideo.addEventListener("timeupdate", () => {
            if (this.wakeVideo.currentTime > 0.8) {
              this.wakeVideo.currentTime = 0;
            }
          });
        }
      });
    }

    let playPromise = this.wakeVideo.play();
    return playPromise
      .then((res) => {
        this.isEnabled = true;
        return res;
      })
      .catch((err) => {
        this.isEnabled = false;
        throw err;
      });
  }

  disable() {
    console.log("disabling wake lock");
    if (nativeWakeLock()) {
      if (this.wakeLock) {
        this.wakeLock.release();
      }
      this.wakeLock = null;
    } else if (oldIOS()) {
      if (this.wakeTimer) {
        console.warn(`
            NoSleep now disabled for older iOS devices.
          `);
        window.clearInterval(this.wakeTimer);
        this.wakeTimer = null;
      }
    } else {
      this.wakeVideo.pause();
    }
    this.isEnabled = false;
  }
}

const wakelock = new WakeLockClass();
export default wakelock;
