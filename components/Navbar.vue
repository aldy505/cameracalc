<template>
  <header class="py-8 w-full">
    <div class="py-3 block">
      <nuxt-link :to="{path: '/'}">
        <h1 class="w-full text-center text-5xl">
          Camera Calculator
        </h1>
      </nuxt-link>
    </div>
    <nav class="py-2">
      <div class="px-8 mx-auto lg:w-2/3">
        <div class="flex flex-col lg:flex-row text-center content-center justify-center">
          <div class="flex-1 px-2 my-2 lg:my-0">
            <nuxt-link :to="{path: '/intensity'}">
              <button
                class="w-full px-3 py-2 hover:text-white hover:bg-indigo-800 rounded-lg border-2 border-indigo-800"
                role="button"
              >
                Light Intensity
              </button>
            </nuxt-link>
          </div>
          <div class="flex-1 px-2 my-2 lg:my-0">
            <nuxt-link :to="{path: '/sensor'}">
              <button
                class="w-full px-3 py-2 hover:text-white hover:bg-indigo-800 rounded-lg border-2 border-indigo-800"
                role="button"
              >
                Sensor Size
              </button>
            </nuxt-link>
          </div>
          <div class="flex-1 px-2 my-2 lg:my-0">
            <nuxt-link :to="{path: '/photometrics'}">
              <button
                class="w-full px-3 py-2 hover:text-white hover:bg-indigo-800 rounded-lg border-2 border-indigo-800"
                role="button"
              >
                Light Photometrics
              </button>
            </nuxt-link>
          </div>
          <div class="flex-1 px-2 my-2 lg:my-0">
            <nuxt-link :to="{path: '/file'}">
              <button
                class="w-full px-3 py-2 hover:text-white hover:bg-indigo-800 rounded-lg border-2 border-indigo-800"
                role="button"
              >
                File Size
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
