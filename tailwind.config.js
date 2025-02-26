/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#F4AC20",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
