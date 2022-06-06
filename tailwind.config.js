module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Lime: "#A3E635",
        Cyan: "#22D3EE",
        Red: "#F87171",
      },
      backgroundImage: theme => ({
        'quiz-img': "url('/Images/quiz.jpg')",
      }),
      width: {
        'fit-content': 'fit-content'
      }
    },
  },
  plugins: [],
  important: true,
}