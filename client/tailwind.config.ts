import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                
            },
            colors:{
                "primary":"var(--primary)",
                "smokey-white":"var(--smokey-white)",
                "light-grey":"var(--light-grey)",
                "dark-grey":"var(--dark-grey)",
            },
            fontFamily:{
                poppins:"var(--poppins)",
            }
        },
    },
    plugins: [],
};
export default config;
