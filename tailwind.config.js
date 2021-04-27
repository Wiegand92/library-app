module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/styles/base/_base.scss',
      './src/styles/components/_app.scss',
      './src/styles/components/_book-card.scss',
      './src/styles/components/_book-form.scss',
      './src/styles/components/_header.scss',
      './src/styles/components/_login-form.scss'
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
