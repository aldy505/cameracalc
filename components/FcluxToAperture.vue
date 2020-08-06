<template lang="pug">
- var fps = ["24", "25", "30", "48", "50", "60", "96", "100", "120"];
div
    .row
        h3 FC/LUX &mdash;&gt; Aperture
    form
        .row
            .col-5.col-md-3.mt-2 ISO:&nbsp;
            .col-7.col-md-3.d-block.mt-2
                input.inp.form-control(
                    type="number"
                    id="iso_1"
                    required
                    v-on:change="calculate"
                    value=""
                )
            .col-5.col-md-3.mt-2 FPS:&nbsp;
            .col-7.col-md-3.d-block.mt-2
                select.inp.form-control#fps_1(v-on:change="calculate")
                    each item in fps
                        option= item
        .row
            .col-5.col-md-3.mt-2 Footcandle:
            .col-7.col-md-3.d-block.mt-2 
                input.inp.form-control(
                    type="number"
                    id="fc_1"
                    v-on:change="calculate"
                    value=""
                )
            .col-5.col-md-3.mt-2 Lux:
            .col-7.col-md-3.d-block.mt-2 
                input.inp.form-control(
                    type="number"
                    id="lux_1"
                    v-on:change="calculate"
                    value=""
                )
        .d-block.mt-2
            p We are using 180 degree shutter.
            span(v-html="output")
</template>

<script>
import $ from "jquery"

export default {
  name: "FcluxToAperture",
  data: function () {
    return {
      output: "",
    }
  },
  methods: {
    calculate: function () {
      let fc = $("#fc_1").val()
      let lux = $("#lux_1").val()
      let iso = $("#iso_1").val()
      let fps = $("#fps_1").val()
      let fpsConst
      // validate FC and Lux
      if (fc == "" && lux == "") {
        this.output =
          '<strong class="text-danger">Please fill the footcandle OR lux</strong>'
      } else {
        // Checking what did they input
        if (fc == "" && lux != "") {
          fc = lux / 10.764
        }

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
          let result = (1 / (2 * fps)) * fc * fpsConst * iso
          this.output =
            '<strong class="text-success">Your aperture needs to be: f/' +
            parseFloat(Math.round(result * 100) / 100).toFixed(2) +
            "</strong>"
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
