<template>
  <div>
    <div class="body container">
      <div class="row">
        <h2>Footcandle/Lux within distance</h2>
      </div>
      <form>
        <div class="row">
          <div class="col-4 mt-2">
            Select category:
          </div>
          <div class="col-8 mt-2">
            <select id="type" class="inp3 form-control" @change="lightsUpdate">
              <option>LED</option>
              <option>HMI</option>
              <option>Tungsten</option>
              <option>Fluorescent</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 mt-2">
            Select lights:
          </div>
          <div class="col-8 mt-2">
            <select
              id="lightname"
              class="inp3 form-control"
              @change="CalculatePhotometrics"
            >
              <option v-for="item in LightNameList" :key="item.Light_Name">
                {{ item.Light_Name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 mt-2">
            Object distance (in meter):
          </div>
          <div class="col-8 mt-2">
            <input
              id="distance"
              class="inp3 form-control"
              type="number"
              @change="CalculatePhotometrics"
            >
          </div>
        </div>
        <div class="d-block mt-2">
          <span v-html="output" />
        </div>
      </form>
      <div class="row mt-3">
        <button
          class="btn btn-block btn-outline-primary"
          type="button"
          @click="toggleLightDetail"
          v-html="textLightDetail"
        />
      </div>
      <div class="row mt-3" :class="{ 'd-none': isLightDetail }">
        <div class="card bg-light p-3 d-block lightdetail">
          <span v-html="LightDetail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import _ from "lodash"
import $ from "jquery"

export default {
  components: {},
  data: function () {
    return {
      LightNameList: [],
      LightDataList: [],
      output: "",
      textLightDetail: `Click here if you're interested on the light's detail`,
      isLightDetail: true,
      LightDetail: "",
    }
  },
  async created() {
    const config = {
      headers: {
        Accept: "application/json",
      },
    }
    //
    try {
      const response = await axios.get(
        `https://api.npoint.io/5c6005c5820933adf98e/Photometrics`,
        config
      )
      // https://api.jsonbin.io/b/5ec4209e18c8475bf16c4b0f <-- alternative, but limited usage
      // https://api.npoint.io/5c6005c5820933adf98e  <-- current use
      this.LightDataList = response.data
    } catch (err) {
      console.log(`Error during axios request: ${err}`)
    }
  },
  methods: {
    toggleLightDetail: function () {
      this.isLightDetail = !this.isLightDetail
      this.textLightDetail = this.isLightDetail
        ? `Click here if you're interested on the light's detail`
        : `Click here to hide the details`
    },
    lightsUpdate: function () {
      let LightType = $("#type").val()
      // Find light name from existing data in LightDataList
      this.LightNameList = _.chain(this.LightDataList)
        .filter(["Type", LightType])
        .map((Lights) =>
          _.omit(Lights, [
            "Type",
            "Style",
            "Color_Temp",
            "Beam_Angle",
            "Tungsten",
            "Daylight",
            "Spot_Diameter",
            "Watts",
            "Battery_Plate",
            "Dimmable",
            "CRI",
            "TLCI",
            "Voltage",
            "Amps",
            "Imperial_Measurement",
            "Metric_Measurement",
            "Flicker_Free",
            "Ballast",
            "Remote_Control",
          ])
        )
        .value()
    },
    CalculatePhotometrics: function () {
      let distance = parseInt($("#distance").val()) * 3.281
      let LightName = $("#lightname").val()

      // Check if object distance input is true
      if (distance == "" || distance == null || distance == undefined) {
        this.output = `<strong class="text-warning">Please fill object distance number</strong>`
        this.LightDetail = `<p>Please put some number in object distance</p>`
      } else if (distance != "") {
        // Find the LightData via lodash
        let LightData = _.chain(this.LightDataList)
          .find(["Light_Name", LightName])
          .value()
        let LightColorTemp = ""
        if (LightData.Tungsten[0].FC === "n/a") {
          // Daylight only
          LightColorTemp = "Daylight only"
          let DaylightFC = isNaN(LightData.Daylight[0].FC)
            ? LightData.Daylight[0].FC.replace(/,/g, "")
            : LightData.Daylight[0].FC
          let LightDaylight = (DaylightFC * 25) / distance ** 2
          LightDaylight = parseFloat(
            Math.round(LightDaylight * 100) / 100
          ).toFixed(0)
          this.output =
            `<strong class="text-success">You will get ${LightDaylight} footcandle or ` +
            parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(
              0
            ) +
            ` lux.</strong>`
        } else if (LightData.Daylight[0].FC === "n/a") {
          // Tungsten only
          LightColorTemp = "Tungsten only"
          let TungstenFC = isNaN(LightData.Tungsten[0].FC)
            ? LightData.Tungsten[0].FC.replace(/,/g, "")
            : LightData.Tungsten[0].FC
          let LightTungsten = (TungstenFC * 25) / distance ** 2
          LightTungsten = parseFloat(
            Math.round(LightTungsten * 100) / 100
          ).toFixed(0)
          this.output =
            `<strong class="text-success">You will get ${LightTungsten} footcandle or ` +
            parseFloat(Math.round(LightTungsten * 10.764 * 100) / 100).toFixed(
              0
            ) +
            ` lux.</strong>`
        } else {
          // Both daylight and tungsten
          LightColorTemp = "Bicolor"
          let DaylightFC = isNaN(LightData.Daylight[0].FC)
            ? LightData.Daylight[0].FC.replace(/,/g, "")
            : LightData.Daylight[0].FC
          let LightDaylight = (DaylightFC * 25) / distance ** 2
          LightDaylight = parseFloat(
            Math.round(LightDaylight * 100) / 100
          ).toFixed(0)
          let TungstenFC = isNaN(LightData.Tungsten[0].FC)
            ? LightData.Tungsten[0].FC.replace(/,/g, "")
            : LightData.Tungsten[0].FC
          let LightTungsten = (TungstenFC * 25) / distance ** 2
          LightTungsten = parseFloat(
            Math.round(LightTungsten * 100) / 100
          ).toFixed(0)
          this.output =
            `<strong class="text-success">You will get ${LightDaylight} footcandle or ` +
            parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(
              0
            ) +
            ` lux for daylight color temperature.
                                <br>and ${LightTungsten} footcandle or ` +
            parseFloat(Math.round(LightTungsten * 10.764 * 100) / 100).toFixed(
              0
            ) +
            ` lux for tungsten color temperature.</strong>`
        }

        // Light Detail for nerds
        this.LightDetail = `<ul><li>Light name: ${LightData.Light_Name}</li>
                                <li>Light style: ${LightData.Style}</li>
                                <li>Color temperature: ${LightData.Color_Temp} (${LightColorTemp})</li>
                                <li>Watts: ${LightData.Watts} (${LightData.Amps[0]["120V"]} amps)</li>
                                <li>Battery plate: ${LightData.Battery_Plate}</li>
                                <li>Dimmable: ${LightData.Dimmable}</li>
                                <li>CRI: ${LightData.CRI}</li>
                                <li>TLCI: ${LightData.TLCI}</li>
                                <li>Weight: ${LightData.Metric_Measurement[0].Weight} kg / ${LightData.Imperial_Measurement[0].Weight} pounds</li>
                                </ul>`
      } else {
        this.output = `<strong class="text-danger>Some error happened for the calculation</strong>`
      }
    },
  },
}
</script>

<style lang="stylus">
.card
    width:100% !important
</style>
