<template lang="pug">

div
    .body.container
        div.fclux(
            v-bind:class="{'d-none': isFclux}"
        )
            <FcluxToAperture />
        div.aperture(
            v-bind:class="{'d-none': isAperture}"
        )
            <ApertureToFclux />
    .footer.mt-3
        .row
            .col-12.offset-md-3.col-md-6
                button.btn.btn-block(
                   type="button" 
                   v-on:click="toggleclass"
                   v-bind:class="{'btn-outline-info': isAperture, 'btn-outline-warning': isFclux}"
                   v-html="btnText"
                )
</template>

<script>
import ApertureToFclux from "~/components/ApertureToFclux.vue"
import FcluxToAperture from "~/components/FcluxToAperture.vue"

export default {
  components: {
    ApertureToFclux,
    FcluxToAperture,
  },
  data: function () {
    return {
      isFclux: false,
      isAperture: true,
      btnText: "Switch to: Aperture &mdash;&gt; FC/LUX",
    }
  },
  methods: {
    toggleclass: function () {
      this.isFclux = !this.isFclux
      this.isAperture = !this.isAperture
      this.btnText = this.isAperture
        ? "Switch to: Aperture &mdash;&gt; FC/LUX"
        : "Switch to: FC/LUX &mdash;&gt; Aperture"
    },
  },
}
</script>

<style lang="stylus"></style>
