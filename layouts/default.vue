<template>
  <div>
    <header class="mt-5 mx-auto">
      <nuxt-link to="/">
        <h1 class="text-center text-dark">
          Camera Calculator
        </h1>
      </nuxt-link>
    </header>
    <main class="mt-4">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-3 py-1">
            <nuxt-link to="/intensity">
              <button class="btn btn-outline-dark btn-block" role="button">
                Light Intensity
              </button>
            </nuxt-link>
          </div>
          <div class="col-12 col-md-3 py-1">
            <nuxt-link to="/sensor">
              <button class="btn btn-outline-dark btn-block" role="button">
                Sensor Size
              </button>
            </nuxt-link>
          </div>
          <div class="col-12 col-md-3 py-1">
            <nuxt-link to="/photometrics">
              <button class="btn btn-outline-dark btn-block" role="button">
                Light Photometrics
              </button>
            </nuxt-link>
          </div>
          <div class="col-12 col-md-3 py-1">
            <nuxt-link to="/file">
              <button class="btn btn-outline-dark btn-block" role="button">
                File Size
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="pt-4">
          <nuxt />
        </div>
      </div>
    </main>
  </div>
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
