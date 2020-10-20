<template>
  <div>
    <div class="row">
      <h3>FC/LUX &mdash;&gt; Aperture</h3>
    </div>
    <form>
      <div class="row">
        <div class="col-5 col-md-3 mt-2">
          ISO:&nbsp;
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <input
            id="iso_1"
            class="inp form-control"
            type="number"
            required="required"
            value=""
            @change="calculate"
          >
        </div>
        <div class="col-5 col-md-3 mt-2">
          FPS:&nbsp;
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <select id="fps_1" class="inp form-control" @change="calculate">
            <option>24</option>
            <option>25</option>
            <option>30</option>
            <option>48</option>
            <option>50</option>
            <option>60</option>
            <option>96</option>
            <option>100</option>
            <option>120</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-5 col-md-3 mt-2">
          Footcandle:
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <input
            id="fc_1"
            class="inp form-control"
            type="number"
            value=""
            @change="calculate"
          >
        </div>
        <div class="col-5 col-md-3 mt-2">
          Lux:
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <input
            id="lux_1"
            class="inp form-control"
            type="number"
            value=""
            @change="calculate"
          >
        </div>
      </div>
      <div class="d-block mt-2">
        <p>We are using 180 degree shutter.</p>
        <span v-html="output" />
      </div>
    </form>
  </div>
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
