<template lang="pug">
  div.p-5
    h2 Hello!
    p Camera Calculator is a small project by Reinaldy Rafli. Aiming to help those working on film industry to calculate things that might be complicated.
    p This is an open source project available on Github.
    .mx-auto.pt-4
      .row
        .col-md-1.col-4.pt-1
          img.img-icon(src="github.png")
        .col-md-3.col-8.pt-1
          a(href="https://github.com/aldy505/cameracalc") GitHub Repository
        .col-md-1.col-4.pt-1
          img.img-icon(src="mail.png")
        .col-md-3.col-8.pt-1
          a(href="mailto:reinaldyrfl@gmail.com") Email Inquiry

</template>

<script>
export default {
  components: {},
}
</script>

<style lang="stylus">
.img-icon
  @media (max-width: 576px)
    max-width 15px
    width 100%
    height auto
  @media (min-width: 576px)
    max-width 25px
    width 100%
    height auto
</style>
