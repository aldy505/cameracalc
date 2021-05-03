<template>
  <div class="container mx-auto font-inter min-h-full">
      <div class="flex flex-col">
<Navbar class="flex-1" />
    <main class="flex-2">
      <Nuxt class="px-8 md:px-10 lg:px-24 py-6 lg:py-16" />
    </main>
    <footer class="w-full flex-shrink-0">
      <div class="py-4 px-8 md:px-10 lg:px-24 text-sm h-12">
        Made with <img src="love.svg" alt="Love" class="w-4 h-auto inline"> in Indonesia
      </div>
    </footer>
      </div>

  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        { rel: 'canonical', href: `${this.$config.baseUrl}${this.$route.path}` },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Calculate things like photometrics, focal length equivalent, and more..',
        },
        {
          hid: 'title',
          name: 'title',
          content: 'Camera Calculator – Free Calculator for Film Camera Department',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'camera, department, film, production, calculator, free',
        },
        { hid: 'author', name: 'author', content: this.$config.author },
        { name: 'robots', content: 'index, follow' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'language', content: this.$config.language },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${this.$config.baseUrl}${this.$route.path}` },
        { property: 'og:title', content: 'Camera Calculator – Free Calculator for Film Camera Department' },
        {
          property: 'og:description',
          content:
          'Calculate things like photometrics, focal length equivalent, and more..',
        },
        { property: 'og:image', content: 'head-icon.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: `${this.$config.baseUrl}${this.$route.path}` },
        {
          property: 'twitter:title',
          content:
          'Camera Calculator – Free Calculator for Film Camera Department',
        },
        {
          property: 'twitter:description',
          content:
          'Calculate things like photometrics, focal length equivalent, and more..',
        },
        { property: 'twitter:image', content: 'head-icon.png' },
      ],
    };
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}
</style>
