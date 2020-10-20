<template>
  <div class="body">
    <div class="container">
      <div class="row">
        <h2>File size from certain format</h2>
      </div>
      <form>
        <div class="row">
          <div class="col-4 mt-2">
            Select format:
          </div>
          <div class="col-8 mt-2">
            <select
              id="format"
              class="inp6 form-control"
              @change="CalculateFileSize"
            >
              <option v-for="item in FileSizeData" :key="item.Format">
                {{ item.Format }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 col-md-2 mt-2">
            FPS:
          </div>
          <div class="col-8 col-md-4 mt-2">
            <select
              id="fps"
              class="inp6 form-control"
              @change="CalculateFileSize"
            >
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
          <div class="col-4 col-md-2 mt-2">
            Resolution:
          </div>
          <div class="col-8 col-md-4 mt-2">
            <select
              id="resolution"
              class="inp6 form-control"
              @change="CalculateFileSize"
            >
              <option
                v-for="resolution in resolutions"
                :key="resolution.id"
                :value="resolution.value"
              >
                {{ resolution.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 mt-2">
            Duration:
          </div>
          <div class="col-4 mt-2">
            <input
              id="duration"
              class="inp6 form-control"
              type="number"
              @change="CalculateFileSize"
            >
          </div>
          <div class="col-4 mt-2">
            <select
              id="durationoption"
              class="inp6 form-control"
              @change="CalculateFileSize"
            >
              <option
                v-for="duration in durations"
                :key="duration.id"
                :value="duration.value"
              >
                {{ duration.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="d-block mt-2">
            <span v-html="output" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import _ from "lodash"
import $ from "jquery"

export default {
  data() {
    return {
      FileSizeData: [],
      resolutions: [
        { id: 1, text: "Full HD (1920 × 1080)", value: "1" },
        { id: 2, text: "2K 16:9 (2048 × 1152)", value: "1.1377" },
        { id: 3, text: "Ultra HD (3840 × 2160)", value: "4" },
        { id: 4, text: "Retina 5K (5120 × 2880)", value: "7.1111" },
        { id: 5, text: "6K (6144 × 3456)", value: "10.24" },
        { id: 6, text: "8K (7680 × 4320)", value: "16" },
      ],
      durations: [
        { id: 1, text: "Hours", value: "h" },
        { id: 2, text: "Minutes", value: "m" },
        { id: 3, text: "Seconds", value: "s" },
      ],
      output: "",
    }
  },
  async created() {
    const config = {
      headers: {
        Accept: "appllication/json",
      },
    }
    try {
      const response = await axios.get(
        "https://api.npoint.io/5c6005c5820933adf98e/FileSize",
        config
      )
      this.FileSizeData = response.data
    } catch (err) {
      console.error(`Error during axios request: ${err}`)
    }
  },
  methods: {
    CalculateFileSize() {
      // Get value from forms
      let format = $("#format").val()
      let fps = $("#fps").val()
      let resolution = $("#resolution").val()
      let duration = $("#duration").val()
      let durationOption = $("#durationoption").val()
      let FormatData, FPSConst, Calculation

      if (duration == null || duration == "") {
        this.output = `Please fill the duration input`
      } else {
        // Convert time to seconds
        if (durationOption == "h") {
          duration = duration * 3600
        } else if (durationOption == "m") {
          duration = duration * 60
        }

        FPSConst = fps / 24

        // Search specific format data
        FormatData = _.find(this.FileSizeData, ["Format", format])

        // File size = (Bitrate / FPS) * Time
        Calculation =
          (FormatData["24-1080"] * resolution * FPSConst * duration) / 8
        console.log(Calculation)
        if (Calculation < 1000) {
          // MB
          Calculation = (Math.round(Calculation * 100) / 100).toFixed(2)
          this.output = `The file size should be <strong>${Calculation} MB</strong>`
        } else if (Calculation <= 1000000) {
          // GB
          let CalculationGB = (
            Math.round((Calculation / 1000) * 100) / 100
          ).toFixed(2)
          this.output = `The file size should be <strong>${Calculation} MB / ${CalculationGB} GB</strong>`
        } else if (Calculation > 1000000) {
          // TB
          let CalculationGB = (
            Math.round((Calculation / 1000) * 100) / 100
          ).toFixed(2)
          let CalculationTB = (
            Math.round((Calculation / 1000000) * 100) / 100
          ).toFixed(2)
          this.output = `The file size should be <strong>${CalculationGB} GB / ${CalculationTB} TB</strong>`
        }
      }
    },
  },
}
</script>
