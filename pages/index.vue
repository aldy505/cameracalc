/* eslint-disable vue/html-closing-bracket-spacing */
<template>
  <div class="p-5">
    <h2>Hello!</h2>
    <p>
      Camera Calculator is a small project by Reinaldy Rafli. Aiming to help
      those working on film industry to calculate things that might be
      complicated.
    </p>
    <p>This is an open source project available on Github.</p>
    <div class="mx-auto pt-4">
      <div class="row">
        <div class="col-md-1 col-4 pt-1">
          <img class="img-icon" src="github.png">
        </div>
        <div class="col-md-3 col-8 pt-1">
          <a href="https://github.com/aldy505/cameracalc">GitHub Repository</a>
        </div>
        <div class="col-md-1 col-4 pt-1">
          <img class="img-icon" src="mail.png">
        </div>
        <div class="col-md-3 col-8 pt-1">
          <a href="mailto:reinaldyrfl@gmail.com">Email Inquiry</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
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
