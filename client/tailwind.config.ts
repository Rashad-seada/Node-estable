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
                "primary":"#F2BA4D",
                "smokey-white":"#f5f5f5",
                "light-grey":"#797979",
                "dark-grey":"#515054",
            },
            fontFamily:{
                poppins:"var(--poppins)",
            }
        },
    },
    plugins: [],
};
export default config;
