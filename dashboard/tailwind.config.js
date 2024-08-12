/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {   
        textColor: "#E3E2F2",
        backgroundColor: "#070712",
        primary: "#B254BD",
        secondary: "#432247",
        accent: "#F3994F",
        accent1: "#0f0f1c",
        accent2: "#e3e2f2"
    },
    fontSize: {
      sm: '0.937rem',
      base: '1rem',
      xl: '1.067rem',
      '2xl': '1.138rem',
      '3xl': '1.214rem',
      '4xl': '1.295rem',
      '5xl': '1.382rem',
    },
    fontFamily: {
      heading: 'Corben',
      body: 'Corben',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },    
  },
  plugins: [],
}
};
