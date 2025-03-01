import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        chambray: "#324E80",
        melrose: "#B1CDFF",
        danube: "#7195CD",
        donkey: "#A09376",
        fall: "#EBE4C1",
        thunder: "#231F20",
      },
    },
  },
  plugins: [],
};
export default config;
