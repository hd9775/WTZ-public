/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "fade-out-in": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-out": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "slide-left": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "slide-right": {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "slide-up": {
          "0%": {
            transform: "translateY(100)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "slide-down": {
          "0%": {
            transform: "translateY(-100)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "bounce-up": {
          "0%": {
            "transform": "translateY(0%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            "transform": "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            "transform": "translateY(0%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
        "drop-fade-out": {
          "0%": {
            "opacity": "0",
            "transform": "translateY(-50%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "100%": {
            "opacity": "0.8",
            "transform": "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
        "time-fade-in-out": "fade-in-out 5.0s ease-in-out",
        "rabbit-fade-out": "fade-out 2.0s linear",
        "fade-out-in": "fade-out-in 2s",
        "slide-left": "slide-left 1.5s linear",
        "slide-right": "slide-right 1.5s linear",
        "slide-up": "slide-up 1.5s linear",
        "slide-down": "slide-down 1.5s linear",
        "bounce-up": "bounce-up 1.0s infinite",
        "black-s-fade-out": "fade-out 12.0s linear",
        "black-m-fade-out": "fade-out 16.0s linear",
        "black-l-fade-out": "fade-out 20.0s linear",
        "drop-fade-out": "drop-fade-out 0.2s infinite linear;",
      },
      dropShadow: {
        "stroke-black": ["-4px -4px 0 #000", "4px -4px 0 #000", "-4px 4px 0 #000", "4px 4px 0 #000"],
        "stroke-black-sm": ["-0.8px -0.8px 0 #000", "0.8px -0.8px 0 #000", "-0.8px 0.8px 0 #000", "0.8px 0.8px 0 #000"],
        "stroke-white": ["-4px -4px 0 #FFF", "4px -4px 0 #FFF", "-4px 4px 0 #FFF", "4px 4px 0 #FFF"],
        "stroke-white-sm": ["-0.8px -0.8px 0 #FFF", "0.8px -0.8px 0 #FFF", "-0.8px 0.8px 0 #FFF", "0.8px 0.8px 0 #FFF"],
      },
    },
    fontFamily: {
      galmuri11: ["galmuri11"],
    },
    screens: {
      "3xl": "1880px",
    },
  },
  plugins: [],
};
