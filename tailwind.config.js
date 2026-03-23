// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         montserratAlt: ["Montserrat Alternates", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };



import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserratAlt: ["Montserrat Alternates", "sans-serif"],
      },
    },
  },
  plugins: [],
});