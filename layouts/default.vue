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
