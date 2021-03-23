<template>
  <div>
    <div class="body container">
      <div class="row">
        <h2>Lens from sensor to sensor</h2>
      </div>
      <form>
        <div class="row">
          <div class="col-4 mt-2">
            From camera:
          </div>
          <div class="col-8 mt-2">
            <select
              id="fromcamera"
              class="inp4 form-control"
              @change="CalculateSensor"
            >
              <option v-for="item in CameraList" :key="item.camera">
                {{ item.camera }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 mt-2">
            To camera:
          </div>
          <div class="col-8 mt-2">
            <select
              id="tocamera"
              class="inp4 form-control"
              @change="CalculateSensor"
            >
              <option v-for="item in CameraList" :key="item.camera">
                {{ item.camera }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 col-md-2 mt-2">
            Lens focal length:
          </div>
          <div class="col-8 col-md-4 mt-2">
            <input
              id="focallength"
              class="form-control inp4"
              type="number"
              @change="CalculateSensor"
            >
          </div>
          <div class="col-4 col-md-2 mt-2">
            Desired aspect ratio:
          </div>
          <div class="col-8 col-md-4 mt-2">
            <select
              id="aspectratio"
              class="inp4 form-control"
              @change="CalculateSensor"
            >
              <option value="1">
                16:9
              </option>
              <option value="0.7407407407407407">
                2.40:1 (cropped)
              </option>
              <option value="1.33">
                4:3
              </option>
            </select>
          </div>
        </div>
        <div class="d-block mt-2">
          <strong :class="outputClass">{{ outputText }}</strong>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import $ from "jquery"

export default {
  components: {},
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get(
        `https://api.npoint.io/5c6005c5820933adf98e/SensorSize`,
        {
      headers: {
        Accept: "application/json",
      },
    }
      )
      // https://api.jsonbin.io/b/5ec4209e18c8475bf16c4b0f <-- alternative, but limited usage
      // https://api.npoint.io/5c6005c5820933adf98e  <-- current use
      const CameraList = _.chain(response.data)
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
      const CameraDataList = _.chain(response.data).value()
      return { CameraList, CameraDataList}
    } catch (error) {
      console.log("Error during axios: " + error)
    }
  },
  data: function () {
    return {
      CameraList: [],
      CameraDataList: [],
      outputText: "",
      outputClass: "",
    }
  },
  methods: {
    CalculateSensor: function () {
      let fromCamera = $("#fromcamera").val()
      let toCamera = $("#tocamera").val()
      let focalLength = $("#focallength").val()
      let aspectRatio = $("#aspectratio").val()

      // Check if they actually input some number to focal length
      if (!focalLength) {
        this.outputClass = 'text-warning'
        this.outputText = 'Please fill in focal length number'
      } else {
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
        this.outputClass = 'text-success'
        this.outputText = `Equivalent focal length for ${toCamera}: ` +
            parseFloat(Math.round(result * 100) / 100).toFixed(0) +
            `mm.`
      }
    },
  },
}
</script>

<style lang="stylus"></style>
