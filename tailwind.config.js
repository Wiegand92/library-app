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
        'eerie-black': '#201e1f',
        'red-orange': '#ff4000',
        'light-salmon': '#faaa8d',
        'antique-white': '#feefdd',
        'pacific-blue': '#50b2c0',
        'morning-blue': '#8ab0ab',
        'glaucous': '#5688c7',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
