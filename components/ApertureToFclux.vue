<template lang="pug">
- var fps = ["24", "25", "30", "48", "50", "60", "96", "100", "120"];
div
    .row
        h3 Aperture &mdash;&gt; FC/LUX
    form
        .row
            .col-5.col-md-3.mt-2 Aperture:&nbsp;
            .col-7.col-md-3.d-block.mt-2
                input.inp.form-control(
                    type="number"
                    id="aperture_2"
                    v-on:change="calculate"
                    required
                )
            .col-5.col-md-3.mt-2 FPS:&nbsp;
            .col-7.col-md-3.d-block.mt-2
                select.inp.form-control#fps_2(v-on:change="calculate")
                    each item in fps
                        option= item
        .row
            .col-5.col-md-3.mt-2 ISO:
            .col-7.col-md-3.d-block.mt-2 
                input.inp.form-control(
                    type="number"
                    id="iso_2"
                    v-on:change="calculate"
                )
        .mt-2.d-block
            p We are using 180 degree shutter.
            span(v-html="output") Your ISO needs to be: 
</template>

<script>
import $ from "jquery"

export default {
  name: "ApertureToFclux",
  data: function () {
    return {
      output: "",
    }
  },
  methods: {
    calculate: function () {
      let fc = $("#fc_2").val()
      let iso = $("#iso_2").val()
      let aperture = $("#aperture_2").val()
      let fps = $("#fps_2").val()
      let fpsConst
      // validate FC and Lux
      if (iso == "" && aperture == "") {
        this.output =
          '<strong class="text-danger">Please fill the ISO and Aperture number</strong>'
      } else {
        // Checking the fps
        if (fps == "24" || fps == "48" || fps == "96") {
          fpsConst = 0.009696
        } else if (fps == "25" || fps == "50" || fps == "100") {
          fpsConst = 0.0099
        } else if (fps == "30" || fps == "60" || fps == "120") {
          fpsConst = 0.01086
        }

        // Now we calculate hard!
        if (fc != "") {
          let fc = aperture / ((1 / (2 * fps)) * iso * fpsConst)
          let lux = fc * 10.764
          this.output =
            '<strong class="text-success">You need: ' +
            parseFloat(Math.round(fc * 100) / 100).toFixed(2) +
            " footcandle and " +
            parseFloat(Math.round(lux * 100) / 100).toFixed(2) +
            " lux.</strong>"
        } else {
          this.output =
            "<strong class='text-warning'>Some error happened.</strong>"
        }
      }
    },
  },
}
</script>

<style lang="stylus" scoped></style>
