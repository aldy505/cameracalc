<template>
  <div>
    <div class="row">
      <h3>Aperture &mdash;&gt; FC/LUX</h3>
    </div>
    <form>
      <div class="row">
        <div class="col-5 col-md-3 mt-2">
          Aperture:&nbsp;
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <input
            id="aperture_2"
            class="inp form-control"
            type="number"
            required="required"
            @change="calculate"
          >
        </div>
        <div class="col-5 col-md-3 mt-2">
          FPS:&nbsp;
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <select id="fps_2" class="inp form-control" @change="calculate">
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
          ISO:
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <input
            id="iso_2"
            class="inp form-control"
            type="number"
            @change="calculate"
          >
        </div>
      </div>
      <div class="mt-2 d-block">
        <p>We are using 180 degree shutter.</p>
        <span v-html="output">Your ISO needs to be: </span>
      </div>
    </form>
  </div>
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
