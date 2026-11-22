/** Colors are taken from the CV: navy sidebar, amber accent, charcoal text, light-grey paper. */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#16384F", deep: "#0F2A3D", soft: "#2A5573" },
        amber: { DEFAULT: "#F5A614", dark: "#C98505", pale: "#FCE7B2" },
        charcoal: "#444547",
        paper: "#F2F2F2",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-lora)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
