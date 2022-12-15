const SUPPORTEDFILES = ["txt", "mp3", "wav", "mp4", "docx"];

// Clamp number between two values with the following line:
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// get file extension
export const getExtension = (filename) => {
  var parts = filename.split(".");
  return parts[parts.length - 1];
};

// check if upload file is valid file type
export const checkFileValidity = (filename) => {
  const ext = getExtension(filename);
  return SUPPORTEDFILES.includes(ext);
};

// compare two arrays for equality
export const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

// check if traget array has all values from source array
export const checkArrayForInclusion = (arr, target) =>
  target.every((v) => arr.includes(v));

// function to capitalize first letter of string
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// check if string is valid email Id

export const isValidEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// check if string is valid url
export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

// check if string is an ip address
export const isUrlIpAddress = (urlString) => {
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  return regexExp.test(urlString);
};

// hash generator
export const hashGenerator = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
};

// check if app is pwa
export const isPwa = () => {
  if (typeof window == "undefined") return false;
  const mqStandAlone = "(display-mode: standalone)";
  if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
    return true;
  }
  return false;
};

// convert date to readable string in DD MM YYYY, HH:MM AM/PM
export const formatDateToString = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const stringDate =
    date.getDay() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear();

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return stringDate + ", " + strTime;
};
