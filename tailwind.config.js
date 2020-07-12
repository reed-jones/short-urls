module.exports = {
  purge: ['./src/**/*.svelte'],
  theme: {
    extend: {
      fontSize: {
        '10rem': '10rem',
        '16rem': '16rem'
      }
    },
  },
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
  plugins: [],
}
