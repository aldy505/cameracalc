<template lang="pug">
div
  header.mt-5.mx-auto
    a(href="/" style="text-decoration:none")
      h1.text-center.text-dark Camera Calculator
  main.mt-4
    .container
      .row
        .col-12.col-md-3.offset-md-2 
          a.btn.btn-outline-dark.btn-block(
            href="intensity"
            role="button"
          ) Light Intensity
        .col-12.col-md-3 
          a.btn.btn-outline-dark.btn-block(
            href="sensor"
            role="button"
          ) Sensor Size
        .col-12.col-md-3 
          a.btn.btn-outline-dark.btn-block(
            href="photometrics"
            role="button"
          ) Light Photometrics
      .pt-4
        <nuxt />
</template>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');

html, body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  -ms-text-size-adjust: 100% !important;
  -webkit-text-size-adjust: 100% !important;
  -moz-osx-font-smoothing: grayscale !important;
  -webkit-font-smoothing: antialiased !important;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

</style>
