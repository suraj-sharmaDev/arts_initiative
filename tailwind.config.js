const themes = require("./src/client/theme/index");

module.exports = {
  content: [
    "{pages,src}/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  darkMode: "class",
  important: true, // important in prod is must be
  theme: ["dark"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{ ...themes }],
  },
};
