<template lang="pug">
div
  .body.container
    .row
      h2 Lens from sensor to sensor
    form
      .row
        .col-4.mt-2 From camera:
        .col-8.mt-2
          select.inp4.form-control#fromcamera(v-on:change="CalculateSensor")
            option(v-for="item in CameraList" :key="item.camera") {{ item.camera }}
            
      .row
        .col-4.mt-2 To camera:
        .col-8.mt-2
          select.inp4.form-control#tocamera(v-on:change="CalculateSensor")
            option(v-for="item in CameraList" :key="item.camera" ) {{ item.camera }}
            //-<client-only><FetchCamera v-for="camera in cameras" :key="camera.camera" /></client-only>
      .row
        .col-4.col-md-2.mt-2 Lens focal length:
        .col-8.col-md-4.mt-2
          input.form-control.inp4#focallength(
            type="number"
            v-on:change="CalculateSensor"
          )
        .col-4.col-md-2.mt-2 Desired aspect ratio:
        .col-8.col-md-4.mt-2
          select.inp4.form-control#aspectratio(v-on:change="CalculateSensor")
            option(value="1") 16:9
            option(value="0.7407407407407407") 2.40:1 (cropped)
            option(value="1.33") 4:3
      .d-block.mt-2
        span(v-html="output")
</template>

<script>
import axios from "axios"
import _ from "lodash"
import $ from "jquery"

export default {
  components: {},
  data: function () {
    return {
      CameraList: [],
      CameraDataList: [],
      output: "",
    }
  },
  async created() {
    const config = {
      headers: {
        Accept: "application/json",
      },
    }

    try {
      const response = await axios.get(
        `https://api.npoint.io/5c6005c5820933adf98e/SensorSize`,
        config
      )
      // https://api.jsonbin.io/b/5ec4209e18c8475bf16c4b0f <-- alternative, but limited usage
      // https://api.npoint.io/5c6005c5820933adf98e  <-- current use
      this.CameraList = _.chain(response.data)
        .map((camera) =>
          _.omit(camera, [
            "sensor_width",
            "sensor_height",
            "sensor_diagonal",
            "aspectratio_opengate",
            "aspectratio_178",
            "active_sensor_height_178",
            "crop_factor",
          ])
        )
        .value()
      this.CameraDataList = _.chain(response.data).value()
    } catch (error) {
      console.log("Error during axios: " + error)
    }
  },
  methods: {
    CalculateSensor: function () {
      let fromCamera = $("#fromcamera").val()
      let toCamera = $("#tocamera").val()
      let focalLength = $("#focallength").val()
      let aspectRatio = $("#aspectratio").val()

      // Check if they actually input some number to focal length
      if (focalLength == "") {
        this.output =
          '<strong class="text-warning">Please fill in focal length number</strong>'
      } else if (focalLength !== "") {
        // Find the dataof fromCamera and toCamera first with lodash
        let fromCameraData = _.chain(this.CameraDataList)
          .map((o) =>
            _.omit(o, [
              "sensor_width",
              "sensor_height",
              "sensor_diagonal",
              "aspectratio_opengate",
              "aspectratio_178",
              "active_sensor_height_178",
            ])
          )
          .find(["camera", fromCamera])
          //.map(o => _.omit(o, ['id', 'camera']))
          .value()
        let toCameraData = _.chain(this.CameraDataList)
          .map((o) =>
            _.omit(o, [
              "sensor_width",
              "sensor_height",
              "sensor_diagonal",
              "aspectratio_opengate",
              "aspectratio_178",
              "active_sensor_height_178",
            ])
          )
          .find(["camera", toCamera])
          //.map(o => _.omit(o, ['id', 'camera']))
          .value()

        let result =
          ((focalLength * fromCameraData["crop_factor"]) /
            toCameraData["crop_factor"]) *
          aspectRatio
        this.output =
          `<strong class="text-success">Equivalent focal length for ${toCamera}: ` +
          parseFloat(Math.round(result * 100) / 100).toFixed(0) +
          "mm.</strong>"
      } else {
        this.output = '<strong class="text-danger">Some error happened</strong>'
      }
    },
  },
}
</script>

<style lang="stylus"></style>
