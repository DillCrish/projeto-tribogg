module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },

   theme: {
      extend: {
        backgroundImage: {
         'hero-pattern': "url('./public/images/background-gaules.png')",
        }
      }
    }
}