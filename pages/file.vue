<template lang="pug">
- var fps = ["24", "25", "30", "48", "50", "60", "96", "100", "120"];
  .body
    .container
        .row
            h2 File size from certain format
        form
            .row
                .col-4.mt-2 Select format:
                .col-8.mt-2
                    select.inp6.form-control#format(v-on:change="CalculateFileSize")
                        option(v-for="item in FileSizeData" :key="item.Format") {{ item.Format }}
            .row
                .col-4.col-md-2.mt-2 FPS:
                .col-8.col-md-4.mt-2
                    select.inp6.form-control#fps(v-on:change="CalculateFileSize")
                        each item in fps
                            option= item
            
                .col-4.col-md-2.mt-2 Resolution:
                .col-8.col-md-4.mt-2
                    select.inp6.form-control#resolution(v-on:change="CalculateFileSize")
                        option(v-for="resolution in resolutions" v-bind:value="resolution.value") {{ resolution.text }}
            .row
                .col-4.mt-2 Duration:
                .col-4.mt-2
                    input.inp6.form-control(
                        id="duration"
                        type="number"
                        v-on:change="CalculateFileSize"
                    )
                .col-4.mt-2
                    select.inp6.form-control#durationoption(v-on:change="CalculateFileSize")
                        option(v-for="duration in durations" v-bind:value="duration.value") {{ duration.text }}
            .row 
                .d-block.mt-2
                    span(v-html="output")
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
        { text: "Full HD (1920 × 1080)", value: "1" },
        { text: "2K 16:9 (2048 × 1152)", value: "1.1377" },
        { text: "Ultra HD (3840 × 2160)", value: "4" },
        { text: "Retina 5K (5120 × 2880)", value: "7.1111" },
        { text: "6K (6144 × 3456)", value: "10.24" },
        { text: "8K (7680 × 4320)", value: "16" },
      ],
      durations: [
        { text: "Hours", value: "h" },
        { text: "Minutes", value: "m" },
        { text: "Seconds", value: "s" },
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

<style></style>
