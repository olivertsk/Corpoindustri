import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1958ac',
        secondary: '#01285d',
        accent: '#ffed00',
      },
      boxShadow: {
        header: '0px 2px 3px rgba(0,0,0,.2)',
      },
    },
  },
  plugins: [],
};
export default config;
