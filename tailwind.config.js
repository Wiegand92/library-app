module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/styles/**'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'gray': '#cfdbd5',
        'tan': '#e8eddf',
        'yellow': '#f5cb5c',
        'black': '#242423',
        'dark-gray': '#333533'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
