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
          <div
            class="flex-1 px-2 my-2 lg:my-0"
            v-for="nav in navigations"
            :key="nav.id"
          >
            <nuxt-link :to="{path: nav.path}">
              <button
                class="w-full px-3 py-2 hover:text-white hover:bg-indigo-800 rounded-lg border-2 border-indigo-800"
                role="button"
              >
                {{ nav.name }}
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navigations: [
        {
          id: 1,
          path: '/intensity',
          name: 'Light Intensity',
        },
        {
          id: 2,
          path: '/sensor',
          name: 'Sensor Size',
        },
        {
          id: 3,
          path: '/photometrics',
          name: 'Light Photometrics',
        },
        {
          id: 4,
          path: '/file',
          name: 'File Size',
        },
        // {
        //   id: 5,
        //   path: '/view',
        //   name: 'Field of View'
        // }
      ],
    };
  },
};
</script>
